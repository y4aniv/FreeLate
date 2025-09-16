import fs from "node:fs/promises";
import fontkit from "@pdf-lib/fontkit";
import { type NextRequest, NextResponse } from "next/server";
import { PDFDocument, type PDFFont, type PDFPage, rgb } from "pdf-lib";
import { INCIDENTS_TYPE, LINES, TRANSPORT_TYPES } from "@/lib/constants";
import { attestationSchema } from "@/lib/schema";
import { randomAgentId } from "@/lib/utils";

interface AttestationParams {
	transportLine: string;
	incidentType: string;
	recipientName: string;
	incidentTimestamp: Date;
	issueTimestamp: Date;
	incidentDuration: string;
}

const FONT_SIZE = 12;
const BLACK_COLOR = rgb(0, 0, 0);
const CHECKBOX_CHAR = String.fromCharCode(0x0033);
const ICON_SIZE = 20;

const ASSET_PATHS = {
	basePdf: "public/assets/pdf/base.pdf",
	nimbusSansFont: "public/assets/fonts/nimbus-sans.otf",
	D050000LFont: "public/assets/fonts/D050000L.otf",
} as const;

const TEXT_POSITIONS = {
	incident: { x: 181, y: 244 },
	incidentDateTime: { x: 122, y: 312 },
	issuedAt: { x: 184, y: 357 },
	beneficiaryName: { x: 71, y: 380 },
	agentId: { x: 127, y: 403 },
} as const;

const CHECKBOX_Y_POSITIONS = {
	over_15_minutes: 154,
	under_15_minutes: 183,
} as const;

const ICON_POSITIONS = {
	lineIcon: { x: 152, y: 295 },
	transportIcon: { x: 126, y: 295 },
} as const;

const loadFonts = async (pdfDoc: PDFDocument) => {
	pdfDoc.registerFontkit(fontkit);

	const [nimbusSansFontBytes, D050000LFontBytes] = await Promise.all([
		fs.readFile(ASSET_PATHS.nimbusSansFont),
		fs.readFile(ASSET_PATHS.D050000LFont),
	]);

	const [nimbusSansFont, D050000LFont] = await Promise.all([
		pdfDoc.embedFont(nimbusSansFontBytes),
		pdfDoc.embedFont(D050000LFontBytes),
	]);

	return { nimbusSansFont, D050000LFont };
};

const loadPngIcon = async (iconPath: string) => {
	return await fs.readFile(`public/assets/${iconPath}`);
};

const addTextToPdf = (
	page: PDFPage,
	text: string,
	position: { x: number; y: number },
	height: number,
	font: PDFFont,
	size = FONT_SIZE,
) => {
	page.drawText(text, {
		x: position.x,
		y: height - position.y,
		size,
		font,
		color: BLACK_COLOR,
	});
};

const addCheckbox = (
	page: PDFPage,
	duration: string,
	height: number,
	font: PDFFont,
) => {
	const yPosition =
		duration === "over_15_minutes"
			? CHECKBOX_Y_POSITIONS.over_15_minutes
			: CHECKBOX_Y_POSITIONS.under_15_minutes;

	page.drawText(CHECKBOX_CHAR, {
		x: 60,
		y: height - yPosition,
		size: 14,
		font,
		color: BLACK_COLOR,
	});
};

const addIcons = async (
	page: PDFPage,
	line: string,
	height: number,
	pdfDoc: PDFDocument,
) => {
	const lineData = LINES.find((l) => l.id === line);
	const transportType = TRANSPORT_TYPES.find(
		(t) => t.id === lineData?.transport_type,
	);

	if (!lineData || !transportType) return;

	const [lineIconBuffer, transportIconBuffer] = await Promise.all([
		loadPngIcon(lineData.icon),
		loadPngIcon(transportType.icon),
	]);

	const [lineIconPng, transportIconPng] = await Promise.all([
		pdfDoc.embedPng(lineIconBuffer),
		pdfDoc.embedPng(transportIconBuffer),
	]);

	page.drawImage(lineIconPng, {
		x: ICON_POSITIONS.lineIcon.x,
		y: height - ICON_POSITIONS.lineIcon.y,
		width: ICON_SIZE,
		height: ICON_SIZE,
	});

	page.drawImage(transportIconPng, {
		x: ICON_POSITIONS.transportIcon.x,
		y: height - ICON_POSITIONS.transportIcon.y,
		width: ICON_SIZE,
		height: ICON_SIZE,
	});
};

const generateAttestation = async (
	params: AttestationParams,
): Promise<Uint8Array> => {
	const {
		transportLine,
		incidentType,
		recipientName,
		incidentTimestamp,
		issueTimestamp,
		incidentDuration,
	} = params;

	try {
		await attestationSchema.validate(params);
	} catch (_) {
		throw new Error("ERROR_INVALID_PARAMS");
	}

	const incidentDate = new Date(incidentTimestamp);
	const issueDate = new Date(issueTimestamp);

	const existingPdfBytes = await fs.readFile(ASSET_PATHS.basePdf);
	const pdfDoc = await PDFDocument.load(existingPdfBytes);

	const { nimbusSansFont, D050000LFont } = await loadFonts(pdfDoc);

	const page = pdfDoc.getPages()[0];
	const { height } = page.getSize();

	addTextToPdf(
		page,
		INCIDENTS_TYPE.find((i) => i.id === incidentType)?.name || "",
		TEXT_POSITIONS.incident,
		height,
		nimbusSansFont,
	);
	addTextToPdf(
		page,
		incidentDate.toLocaleDateString("fr-FR", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
		}) +
			" à " +
			incidentDate
				.toLocaleTimeString("fr-FR", {
					hour: "2-digit",
					minute: "2-digit",
				})
				.replace(":", "h") +
			"mn",
		TEXT_POSITIONS.incidentDateTime,
		height,
		nimbusSansFont,
	);
	addTextToPdf(
		page,
		issueDate.toLocaleDateString("fr-FR", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
		}) +
			" à " +
			issueDate
				.toLocaleTimeString("fr-FR", {
					hour: "2-digit",
					minute: "2-digit",
				})
				.replace(":", "h") +
			"mn",
		TEXT_POSITIONS.issuedAt,
		height,
		nimbusSansFont,
	);
	addTextToPdf(
		page,
		recipientName,
		TEXT_POSITIONS.beneficiaryName,
		height,
		nimbusSansFont,
	);
	addTextToPdf(
		page,
		randomAgentId(),
		TEXT_POSITIONS.agentId,
		height,
		nimbusSansFont,
	);

	addCheckbox(page, incidentDuration, height, D050000LFont);

	await addIcons(page, transportLine, height, pdfDoc);

	return pdfDoc.save();
};

const POST = async (request: NextRequest) => {
	try {
		const body = await request.json();

		const {
			transportLine,
			incidentType,
			recipientName,
			incidentTimestamp,
			issueTimestamp,
			incidentDuration,
		} = body;

		if (
			!transportLine ||
			!incidentType ||
			!recipientName ||
			!incidentTimestamp ||
			!issueTimestamp ||
			!incidentDuration
		) {
			return NextResponse.json({ error: "MISSING_PARAMS" }, { status: 400 });
		}

		const params: AttestationParams = {
			transportLine,
			incidentType,
			recipientName,
			incidentTimestamp: new Date(incidentTimestamp),
			issueTimestamp: new Date(issueTimestamp),
			incidentDuration,
		};

		const pdfBytes = await generateAttestation(params);

		return new NextResponse(Buffer.from(pdfBytes), {
			status: 200,
			headers: {
				"Content-Type": "application/pdf",
				"Content-Disposition": `attachment; filename="attestation-${Date.now()}.pdf"`,
				"Content-Length": pdfBytes.length.toString(),
			},
		});
	} catch (error) {
		if (error instanceof Error && error.message === "ERROR_INVALID_PARAMS") {
			return NextResponse.json({ error: "INVALID_PARAMS" }, { status: 400 });
		}

		return NextResponse.json(
			{ error: "INTERNAL_SERVER_ERROR" },
			{ status: 500 },
		);
	}
};

export const runtime = "nodejs";
export { POST };
