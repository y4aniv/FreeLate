"use client";

import { Button, Center, Select, Stack, TextInput } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import Logo from "@/components/logo";

const Root = () => {
	return (
		<Center className="h-dvh">
			<Stack className="w-full max-w-lg p-4">
				<Logo />
				<Select
					label={"Ligne de transport"}
					placeholder={"3bis, 9, RER A, ..."}
					searchable
				/>
				<Select
					label={"Nature de l'incident"}
					placeholder={"Mouvement sociale, panne de signalisation, ..."}
					searchable
				/>
				<TextInput
					label={"Identité du bénéficiaire"}
					placeholder={"Fulgence Bienvenüe"}
				/>
				<DateTimePicker
					label={"Date & heure de délivrance de l'attestation"}
					placeholder={"21/03/1948 00:00"}
				/>
				<Select label={"Durée de l'incident"} placeholder={"30 minutes"} />
				<TextInput
					label={"Matricule de l’agent émetteur"}
					defaultValue={"FB84392"}
					disabled
				/>
				<Button fullWidth type="submit">
					{"Générer mon attestation"}
				</Button>
			</Stack>
		</Center>
	);
};

export default Root;
