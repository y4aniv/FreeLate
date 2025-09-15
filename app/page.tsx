import { Button, Center, Select, Stack, TextInput } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import Logo from "@/components/logo";
import { DURATION, INCIDENTS, LINES } from "@/lib/constants";
import { randomAgentId } from "@/lib/utils";

const Root = () => {
	return (
		<Center className="min-h-dvh">
			<Stack className="w-full max-w-lg p-4">
				<Center className="mb-4">
					<Logo />
				</Center>
				<Select
					label={"Ligne de transport"}
					placeholder={"3bis, 9, RER A, ..."}
					searchable
					data={LINES.map((line) => ({ label: line.name, value: line.id }))}
				/>
				<Select
					label={"Nature de l'incident"}
					placeholder={"Mouvement sociale, panne de signalisation, ..."}
					searchable
					data={INCIDENTS.sort((a, b) => a.name.localeCompare(b.name)).map(
						(incident) => ({
							label: incident.name,
							value: incident.id,
						}),
					)}
				/>
				<TextInput
					label={"Identité du bénéficiaire"}
					placeholder={"Fulgence Bienvenüe"}
				/>
				<DateTimePicker
					label={"Date & heure de délivrance de l'attestation"}
					placeholder={"21/03/1948 00:00"}
				/>
				<Select
					label={"Durée de l'incident"}
					placeholder={"Supérieure à 15 minutes"}
					data={DURATION.map((duration) => ({
						label: duration.name,
						value: duration.id,
					}))}
				/>
				<TextInput
					label={"Matricule de l’agent émetteur"}
					defaultValue={randomAgentId()}
					disabled
				/>
				<Button fullWidth type="submit">
					{"Générer mon attestation"}
				</Button>
				<p className="text-xs text-gray-500 text-center">
					En cliquant sur "Générer mon attestation", l’utilisateur reconnaît
					être seul responsable des informations fournies et de l’utilisation
					qui en est faite, et accepte que l’attestation générée n’a aucune
					valeur légale ou officielle et ne peut en aucun cas être utilisée à
					des fins administratives, juridiques ou réglementaires.
				</p>
			</Stack>
		</Center>
	);
};

export default Root;
