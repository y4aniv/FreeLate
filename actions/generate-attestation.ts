"use server";
import fs from "node:fs/promises";
import fontkit from "@pdf-lib/fontkit";
import { PDFDocument, type PDFFont, type PDFPage, rgb } from "pdf-lib";
import sharp from "sharp";
import { LINES, TRANSPORT_TYPES } from "@/lib/constants";

interface AttestationParams {
	transportLine: string;
	incidentType: string;
	recipientName: string;
	incidentTimestamp: string;
	issueTimestamp: string;
	incidentDuration: string;
	issuerAgentId: string;
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

const convertSvgToPng = async (svgPath: string) => {
	const svgBytes = await fs.readFile(svgPath);
	return sharp(svgBytes).png().toBuffer();
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
		convertSvgToPng(`public/assets/${lineData.icon}`),
		convertSvgToPng(`public/assets/${transportType.icon}`),
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
		issuerAgentId,
	} = params;

	const existingPdfBytes = await fs.readFile(ASSET_PATHS.basePdf);
	const pdfDoc = await PDFDocument.load(existingPdfBytes);

	const { nimbusSansFont, D050000LFont } = await loadFonts(pdfDoc);

	const page = pdfDoc.getPages()[0];
	const { height } = page.getSize();

	addTextToPdf(
		page,
		incidentType,
		TEXT_POSITIONS.incident,
		height,
		nimbusSansFont,
	);
	addTextToPdf(
		page,
		incidentTimestamp,
		TEXT_POSITIONS.incidentDateTime,
		height,
		nimbusSansFont,
	);
	addTextToPdf(
		page,
		issueTimestamp,
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
		issuerAgentId,
		TEXT_POSITIONS.agentId,
		height,
		nimbusSansFont,
	);

	addCheckbox(page, incidentDuration, height, D050000LFont);

	await addIcons(page, transportLine, height, pdfDoc);

	return pdfDoc.save();
};

export default generateAttestation;
