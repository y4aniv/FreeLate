const LINES = [
	{
		name: "1",
		id: "1",
		transport_type: "metro",
	},
	{
		name: "2",
		id: "2",
		transport_type: "metro",
	},
	{
		name: "3",
		id: "3",
		transport_type: "metro",
	},
	{
		name: "3bis",
		id: "3bis",
		transport_type: "metro",
	},
	{
		name: "4",
		id: "4",
		transport_type: "metro",
	},
	{
		name: "5",
		id: "5",
		transport_type: "metro",
	},
	{
		name: "6",
		id: "6",
		transport_type: "metro",
	},
	{
		name: "7",
		id: "7",
		transport_type: "metro",
	},
	{
		name: "7bis",
		id: "7bis",
		transport_type: "metro",
	},
	{
		name: "8",
		id: "8",
		transport_type: "metro",
	},
	{
		name: "9",
		id: "9",
		transport_type: "metro",
	},
	{
		name: "10",
		id: "10",
		transport_type: "metro",
	},
	{
		name: "11",
		id: "11",
		transport_type: "metro",
	},
	{
		name: "12",
		id: "12",
		transport_type: "metro",
	},
	{
		name: "13",
		id: "13",
		transport_type: "metro",
	},
	{
		name: "14",
		id: "14",
		transport_type: "metro",
	},
	{
		name: "RER A",
		id: "rer_a",
		transport_type: "rer",
	},
	{
		name: "RER B",
		id: "rer_b",
		transport_type: "rer",
	},
	{
		name: "RER C",
		id: "rer_c",
		transport_type: "rer",
	},
	{
		name: "T1",
		id: "t1",
		transport_type: "tramway",
	},
	{
		name: "T2",
		id: "t2",
		transport_type: "tramway",
	},
	{
		name: "T3a",
		id: "t3a",
		transport_type: "tramway",
	},
	{
		name: "T3b",
		id: "t3b",
		transport_type: "tramway",
	},
	{
		name: "T4",
		id: "t4",
		transport_type: "tramway",
	},
	{
		name: "T5",
		id: "t5",
		transport_type: "tramway",
	},
	{
		name: "T6",
		id: "t6",
		transport_type: "tramway",
	},
	{
		name: "T7",
		id: "t7",
		transport_type: "tramway",
	},
	{
		name: "T8",
		id: "t8",
		transport_type: "tramway",
	},
	{
		name: "T9",
		id: "t9",
		transport_type: "tramway",
	},
];

const TRANSPORT_TYPES = [
	{
		name: "Métro",
		id: "metro",
	},
	{
		name: "RER",
		id: "rer",
	},
	{
		name: "Tramway",
		id: "tramway",
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
