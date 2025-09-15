"use client";

import { Button, Center, Select, TextInput } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { yupResolver } from "mantine-form-yup-resolver";
import generateAttestation from "@/actions/generate-attestation";
import Logo from "@/components/logo";
import { DURATION, INCIDENTS_TYPE, LINES } from "@/lib/constants";
import { attestationSchema } from "@/lib/schema";

const Root = () => {
	const form = useForm({
		mode: "uncontrolled",
		initialValues: {
			transportLine: "",
			incidentType: "",
			recipientName: "",
			incidentTimestamp: new Date(),
			issueTimestamp: new Date(),
			incidentDuration: "",
		},
		validate: yupResolver(attestationSchema),
	});

	const handleSubmit = async (
		values: typeof attestationSchema.__outputType,
	) => {
		try {
			const pdfBytes = await generateAttestation({
				transportLine: values.transportLine,
				incidentType: values.incidentType,
				recipientName: values.recipientName,
				incidentTimestamp: values.incidentTimestamp,
				issueTimestamp: values.issueTimestamp,
				incidentDuration: values.incidentDuration,
			});
			const blob = new Blob([new Uint8Array(pdfBytes)], {
				type: "application/pdf",
			});
			const url = URL.createObjectURL(blob);
			window.open(url, "_blank");
		} catch (error) {
			console.warn(error);
		}
	};

	return (
		<Center className="min-h-dvh">
			<form
				className="w-full max-w-lg p-4 flex flex-col gap-4"
				onSubmit={form.onSubmit(handleSubmit)}
			>
				<Center className="mb-4">
					<Logo />
				</Center>
				<Select
					label={"Ligne de transport"}
					placeholder={"3bis, 9, RER A, ..."}
					searchable
					data={LINES.map((line) => ({ label: line.name, value: line.id }))}
					key={form.key("transportLine")}
					{...form.getInputProps("transportLine")}
				/>
				<Select
					label={"Nature de l'incident"}
					placeholder={"Mouvement sociale, panne de signalisation, ..."}
					searchable
					data={INCIDENTS_TYPE.sort((a, b) => a.name.localeCompare(b.name)).map(
						(incident) => ({
							label: incident.name,
							value: incident.id,
						}),
					)}
					key={form.key("incidentType")}
					{...form.getInputProps("incidentType")}
				/>
				<TextInput
					label={"Identité du bénéficiaire"}
					placeholder={"Fulgence Bienvenüe"}
					key={form.key("recipientName")}
					{...form.getInputProps("recipientName")}
				/>
				<DateTimePicker
					label={"Date & heure de l'incident"}
					placeholder={"21/03/1948 00:00"}
					key={form.key("incidentTimestamp")}
					{...form.getInputProps("incidentTimestamp")}
				/>
				<DateTimePicker
					label={"Date & heure de délivrance de l'attestation"}
					placeholder={"21/03/1948 00:00"}
					key={form.key("issueTimestamp")}
					{...form.getInputProps("issueTimestamp")}
				/>
				<Select
					label={"Durée de l'incident"}
					placeholder={"Supérieure à 15 minutes"}
					data={DURATION.map((duration) => ({
						label: duration.name,
						value: duration.id,
					}))}
					key={form.key("incidentDuration")}
					{...form.getInputProps("incidentDuration")}
				/>
				<Button fullWidth type="submit">
					{"Générer mon attestation"}
				</Button>
				<p className="text-xs text-gray-500 text-center">
					En cliquant sur "Générer mon attestation", l'utilisateur reconnaît
					être seul responsable des informations fournies et de l'utilisation
					qui en est faite, et accepte que l'attestation générée n'a aucune
					valeur légale ou officielle et ne peut en aucun cas être utilisée à
					des fins administratives, juridiques ou réglementaires.
				</p>
			</form>
		</Center>
	);
};

export default Root;
