import * as yup from "yup";
import { DURATION, INCIDENTS_TYPE, LINES } from "./constants";

const attestationSchema = yup.object({
	transportLine: yup
		.string()
		.required("La ligne de transport est requise.")
		.test(
			"valid-transport-line",
			"La ligne de transport est invalide.",
			(val) => LINES.some((line) => line.id === val),
		),
	incidentType: yup
		.string()
		.required("Le type d'incident est requis.")
		.test("valid-incident-type", "Le type d'incident est invalide.", (val) =>
			INCIDENTS_TYPE.some((incident) => incident.id === val),
		),
	recipientName: yup
		.string()
		.required("L'identité du bénéficiaire est invalide."),
	issueTimestamp: yup
		.date()
		.required("La date et l'heure de délivrance sont requises."),
	incidentTimestamp: yup
		.date()
		.required("La date et l'heure de l'incident sont requises."),
	incidentDuration: yup
		.string()
		.required("La durée de l'incident est requise.")
		.test("valid-duration", "La durée de l'incident est invalide.", (val) =>
			DURATION.some((duration) => duration.id === val),
		),
});

export { attestationSchema };
