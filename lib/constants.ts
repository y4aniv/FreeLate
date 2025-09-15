const LINES = [
	{
		name: "Métro 1",
		id: "metro_1",
		transport_type: "metro",
		icon: "LINES/metro/metro_1.svg",
	},
	{
		name: "Métro 2",
		id: "metro_2",
		transport_type: "metro",
		icon: "LINES/metro/metro_2.svg",
	},
	{
		name: "Métro 3",
		id: "metro_3",
		transport_type: "metro",
		icon: "LINES/metro/metro_3.svg",
	},
	{
		name: "Métro 3bis",
		id: "metro_3bis",
		transport_type: "metro",
		icon: "LINES/metro/metro_3bis.svg",
	},
	{
		name: "Métro 4",
		id: "metro_4",
		transport_type: "metro",
		icon: "LINES/metro/metro_4.svg",
	},
	{
		name: "Métro 5",
		id: "metro_5",
		transport_type: "metro",
		icon: "LINES/metro/metro_5.svg",
	},
	{
		name: "Métro 6",
		id: "metro_6",
		transport_type: "metro",
		icon: "LINES/metro/metro_6.svg",
	},
	{
		name: "Métro 7",
		id: "metro_7",
		transport_type: "metro",
		icon: "LINES/metro/metro_7.svg",
	},
	{
		name: "Métro 7bis",
		id: "metro_7bis",
		transport_type: "metro",
		icon: "LINES/metro/metro_7bis.svg",
	},
	{
		name: "Métro 8",
		id: "metro_8",
		transport_type: "metro",
		icon: "LINES/metro/metro_8.svg",
	},
	{
		name: "Métro 9",
		id: "metro_9",
		transport_type: "metro",
		icon: "LINES/metro/metro_9.svg",
	},
	{
		name: "Métro 10",
		id: "metro_10",
		transport_type: "metro",
		icon: "LINES/metro/metro_10.svg",
	},
	{
		name: "Métro 11",
		id: "metro_11",
		transport_type: "metro",
		icon: "LINES/metro/metro_11.svg",
	},
	{
		name: "Métro 12",
		id: "metro_12",
		transport_type: "metro",
		icon: "LINES/metro/metro_12.svg",
	},
	{
		name: "Métro 13",
		id: "metro_13",
		transport_type: "metro",
		icon: "LINES/metro/metro_13.svg",
	},
	{
		name: "Métro 14",
		id: "metro_14",
		transport_type: "metro",
		icon: "LINES/metro/metro_14.svg",
	},
	{
		name: "RER A",
		id: "rer_a",
		transport_type: "rer",
		icon: "LINES/rer/rer_a.svg",
	},
	{
		name: "RER B",
		id: "rer_b",
		transport_type: "rer",
		icon: "LINES/rer/rer_b.svg",
	},
	{
		name: "RER C",
		id: "rer_c",
		transport_type: "rer",
		icon: "LINES/rer/rer_c.svg",
	},
	{
		name: "Tramway T1",
		id: "tramway_t1",
		transport_type: "tramway",
		icon: "LINES/tramway/tramway_t1.svg",
	},
	{
		name: "Tramway T2",
		id: "tramway_t2",
		transport_type: "tramway",
		icon: "LINES/tramway/tramway_t2.svg",
	},
	{
		name: "Tramway T3a",
		id: "tramway_t3a",
		transport_type: "tramway",
		icon: "LINES/tramway/tramway_t3a.svg",
	},
	{
		name: "Tramway T3b",
		id: "tramway_t3b",
		transport_type: "tramway",
		icon: "LINES/tramway/tramway_t3b.svg",
	},
	{
		name: "Tramway T4",
		id: "tramway_t4",
		transport_type: "tramway",
		icon: "LINES/tramway/tramway_t4.svg",
	},
	{
		name: "Tramway T5",
		id: "tramway_t5",
		transport_type: "tramway",
		icon: "LINES/tramway/tramway_t5.svg",
	},
	{
		name: "Tramway T6",
		id: "tramway_t6",
		transport_type: "tramway",
		icon: "LINES/tramway/tramway_t6.svg",
	},
	{
		name: "Tramway T7",
		id: "tramway_t7",
		transport_type: "tramway",
		icon: "LINES/tramway/tramway_t7.svg",
	},
	{
		name: "Tramway T8",
		id: "tramway_t8",
		transport_type: "tramway",
		icon: "LINES/tramway/tramway_t8.svg",
	},
	{
		name: "Tramway T9",
		id: "tramway_t9",
		transport_type: "tramway",
		icon: "LINES/tramway/tramway_t9.svg",
	},
];

const TRANSPORT_TYPES = [
	{
		name: "Métro",
		id: "metro",
		icon: "TRANSPORT_TYPES/metro.svg",
	},
	{
		name: "RER",
		id: "rer",
		icon: "TRANSPORT_TYPES/rer.svg",
	},
	{
		name: "Tramway",
		id: "tramway",
		icon: "TRANSPORT_TYPES/tramway.svg",
	},
];

const INCIDENTS = [
	{
		name: "Malaise voyageur",
		id: "passenger_illness",
	},
	{
		name: "Panne de signalisation",
		id: "signal_failure",
	},
	{
		name: "Panne électrique",
		id: "power_failure",
	},
	{
		name: "Incident technique",
		id: "technical_issue",
	},
	{
		name: "Train en panne",
		id: "train_breakdown",
	},
	{
		name: "Colis suspect",
		id: "suspicious_package",
	},
	{
		name: "Incident d'exploitation",
		id: "operational_issue",
	},
	{
		name: "Voyageur sur la voie",
		id: "person_on_tracks",
	},
	{
		name: "Mesure de sécurité",
		id: "safety_measure",
	},
	{
		name: "Divers incidents",
		id: "various_incidents",
	},
	{
		name: "Incident voyageur",
		id: "passenger_incident",
	},
	{
		name: "Accident grave de voyageur",
		id: "serious_passenger_accident",
	},
	{
		name: "Panne de matériel",
		id: "equipment_failure",
	},
	{
		name: "Mouvement social",
		id: "strike",
	},
	{
		name: "Obstacle sur la voie",
		id: "obstacle_on_tracks",
	},
	{
		name: "Acte de malveillance",
		id: "malicious_act",
	},
	{
		name: "Dégagement de fumée",
		id: "smoke_release",
	},
	{
		name: "Intervention des équipes techniques",
		id: "technical_team_intervention",
	},
	{
		name: "Panne de caténaire",
		id: "catenary_failure",
	},
	{
		name: "Déclenchement d'un signal d'alarme",
		id: "alarm_triggered",
	},
	{
		name: "Bagage oublié",
		id: "forgotten_luggage",
	},
	{
		name: "Manifestation",
		id: "protest",
	},
	{
		name: "Animal sur la voie",
		id: "animal_on_tracks",
	},
	{
		name: "Accident grave de personne",
		id: "serious_personal_accident",
	},
	{
		name: "Personnes sur les voies",
		id: "people_on_tracks",
	},
];

const DURATION = [
	{
		name: "Supérieure à 15 minutes",
		id: "over_15_minutes",
	},
	{
		name: "Supérieure à 30 minutes",
		id: "over_30_minutes",
	},
];

export { LINES, INCIDENTS, DURATION, TRANSPORT_TYPES };
