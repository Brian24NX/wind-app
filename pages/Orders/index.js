// pages/Orders/index.js
var languageUtil = require('../../utils/languageUtils')
const dayjs = require("dayjs");
import {
    shipmentTracking
} from '../../api/modules/home';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        languageContent: {},
        verifyInfo: {},
        shipmentRef: '',
        showRemind: false,
        loading: true,
        noData: false,
        data: [],
        list: [],
        results: [],
        showSearch: true,
        showHis: false,
        searchHis: [],
        codeData: [
            {
                "data": [{
                    "containerRef": "TEMU0227469", "equipmentSize": "22G1", "movement": [{
                        "eventID": "0e1e55da0ea7439dd7eb66f9988e8fa0f6a6c1a6",
                        "eventCreatedDateTime": "2023-06-13T02:33:07+00:00",
                        "eventType": "TRANSPORT",
                        "eventClassifierCode": "PLN",
                        "eventDateTime": "2023-07-18T04:18:00+08:00",
                        "carrierSpecificData": {
                            "internalEventCode": "PVA",
                            "internalEventLabel": "Vessel Arrival",
                            "internalLocationCode": "CNSHK",
                            "internalFacilityCode": "CNSHKDSCT",
                            "bookingExportVoyageReference": "0FTHSN1MA",
                            "transportationPhase": "Import",
                            "shipmentLocationType": "POD",
                            "transportCallSequenceTotal": 2,
                            "numberOfUnits": 12
                        },
                        "transportEventTypeCode": "ARRI",
                        "transportCall": {
                            "transportCallID": "50002857703",
                            "importVoyageNumber": "0FTHSN1MA",
                            "transportCallSequenceNumber": 2,
                            "facilityCode": "SCT",
                            "facilityCodeListProvider": "SMDG",
                            "modeOfTransport": "VESSEL",
                            "location": {
                                "locationName": "SHEKOU",
                                "latitude": "22.49639",
                                "longitude": "113.92",
                                "address": {
                                    "name": "JETTY THREE, HARBOUR ROAD,",
                                    "street": ".",
                                    "city": "SHEKOU",
                                    "country": "CHINA"
                                }
                            },
                            "vessel": {
                                "vesselIMONumber": "9850848",
                                "vesselName": "EVER FOND",
                                "vesselFlag": "LR",
                                "vesselCallSignNumber": "5LCS5",
                                "vesselOperatorCarrierCode": "EMC"
                            }
                        },
                        "documentReferences": [{
                            "documentReferenceType": "BKG",
                            "documentReferenceValue": "401f423b25b649a73b7b64f232d9a33efcdd1a788e0992edfd8c48449f927dce"
                        }],
                        "references": [{"referenceType": "EQ", "referenceValue": "APZU3856920"}, {
                            "referenceType": "EQ",
                            "referenceValue": "APZU3936760"
                        }, {"referenceType": "EQ", "referenceValue": "CAIU3707093"}, {
                            "referenceType": "EQ",
                            "referenceValue": "CMAU0323116"
                        }, {"referenceType": "EQ", "referenceValue": "CMAU0875630"}, {
                            "referenceType": "EQ",
                            "referenceValue": "MAGU2239792"
                        }, {"referenceType": "EQ", "referenceValue": "TCLU7252194"}, {
                            "referenceType": "EQ",
                            "referenceValue": "TEMU0227469"
                        }, {"referenceType": "EQ", "referenceValue": "TEMU3240783"}, {
                            "referenceType": "EQ",
                            "referenceValue": "TLLU2806305"
                        }, {"referenceType": "EQ", "referenceValue": "TRHU3662231"}, {
                            "referenceType": "EQ",
                            "referenceValue": "TRLU9614964"
                        }],
                        "equipmentReference": "TEMU0227469"
                    }, {
                        "eventID": "91c2c128b8913862789f84fc9674abe5064d09f7",
                        "eventCreatedDateTime": "2023-06-13T02:33:07+00:00",
                        "eventType": "TRANSPORT",
                        "eventClassifierCode": "PLN",
                        "eventDateTime": "2023-06-11T06:27:00-07:00",
                        "carrierSpecificData": {
                            "internalEventCode": "PVD",
                            "internalEventLabel": "Vessel Departure",
                            "internalLocationCode": "USLAX",
                            "internalFacilityCode": "USLAXMETS",
                            "bookingExportVoyageReference": "0FTHSN1MA",
                            "transportationPhase": "Export",
                            "shipmentLocationType": "POL",
                            "transportCallSequenceTotal": 2,
                            "numberOfUnits": 12
                        },
                        "transportEventTypeCode": "DEPA",
                        "transportCall": {
                            "transportCallID": "50002856834",
                            "exportVoyageNumber": "0FTHSN1MA",
                            "transportCallSequenceNumber": 1,
                            "facilityCode": "ETS",
                            "facilityCodeListProvider": "SMDG",
                            "modeOfTransport": "VESSEL",
                            "location": {
                                "locationName": "LOS ANGELES, CA",
                                "latitude": "34.05222",
                                "longitude": "-118.24278",
                                "address": {
                                    "name": "389 TERMINAL ISLAND WAY",
                                    "street": "BERTHS 226-236",
                                    "postCode": "90731",
                                    "city": "LOS ANGELES",
                                    "country": "UNITED STATES"
                                }
                            },
                            "vessel": {
                                "vesselIMONumber": "9850848",
                                "vesselName": "EVER FOND",
                                "vesselFlag": "LR",
                                "vesselCallSignNumber": "5LCS5",
                                "vesselOperatorCarrierCode": "EMC"
                            }
                        },
                        "documentReferences": [{
                            "documentReferenceType": "BKG",
                            "documentReferenceValue": "401f423b25b649a73b7b64f232d9a33efcdd1a788e0992edfd8c48449f927dce"
                        }],
                        "references": [{"referenceType": "EQ", "referenceValue": "APZU3856920"}, {
                            "referenceType": "EQ",
                            "referenceValue": "APZU3936760"
                        }, {"referenceType": "EQ", "referenceValue": "CAIU3707093"}, {
                            "referenceType": "EQ",
                            "referenceValue": "CMAU0323116"
                        }, {"referenceType": "EQ", "referenceValue": "CMAU0875630"}, {
                            "referenceType": "EQ",
                            "referenceValue": "MAGU2239792"
                        }, {"referenceType": "EQ", "referenceValue": "TCLU7252194"}, {
                            "referenceType": "EQ",
                            "referenceValue": "TEMU0227469"
                        }, {"referenceType": "EQ", "referenceValue": "TEMU3240783"}, {
                            "referenceType": "EQ",
                            "referenceValue": "TLLU2806305"
                        }, {"referenceType": "EQ", "referenceValue": "TRHU3662231"}, {
                            "referenceType": "EQ",
                            "referenceValue": "TRLU9614964"
                        }],
                        "equipmentReference": "TEMU0227469"
                    }, {
                        "eventID": "93be2a319f6bb52aa06bbcd65827c340674e488b",
                        "eventCreatedDateTime": "2023-06-11T03:04:05+00:00",
                        "eventType": "TRANSPORT",
                        "eventClassifierCode": "ACT",
                        "eventDateTime": "2023-06-10T19:00:00-07:00",
                        "carrierSpecificData": {
                            "internalEventCode": "AVD",
                            "internalEventLabel": "Vessel Departure",
                            "internalLocationCode": "USLAX",
                            "internalFacilityCode": "USLAXMETS",
                            "bookingExportVoyageReference": "0FTHSN1MA",
                            "transportationPhase": "Export",
                            "shipmentLocationType": "POL",
                            "transportCallSequenceTotal": 2,
                            "numberOfUnits": 12
                        },
                        "transportEventTypeCode": "DEPA",
                        "transportCall": {
                            "transportCallID": "50002856834",
                            "exportVoyageNumber": "0FTHSN1MA",
                            "transportCallSequenceNumber": 1,
                            "facilityCode": "ETS",
                            "facilityCodeListProvider": "SMDG",
                            "modeOfTransport": "VESSEL",
                            "location": {
                                "locationName": "LOS ANGELES, CA",
                                "latitude": "34.05222",
                                "longitude": "-118.24278",
                                "address": {
                                    "name": "389 TERMINAL ISLAND WAY",
                                    "street": "BERTHS 226-236",
                                    "postCode": "90731",
                                    "city": "LOS ANGELES",
                                    "country": "UNITED STATES"
                                }
                            },
                            "vessel": {
                                "vesselIMONumber": "9850848",
                                "vesselName": "EVER FOND",
                                "vesselFlag": "LR",
                                "vesselCallSignNumber": "5LCS5",
                                "vesselOperatorCarrierCode": "EMC"
                            }
                        },
                        "documentReferences": [{
                            "documentReferenceType": "BKG",
                            "documentReferenceValue": "401f423b25b649a73b7b64f232d9a33efcdd1a788e0992edfd8c48449f927dce"
                        }],
                        "references": [{"referenceType": "EQ", "referenceValue": "APZU3856920"}, {
                            "referenceType": "EQ",
                            "referenceValue": "APZU3936760"
                        }, {"referenceType": "EQ", "referenceValue": "CAIU3707093"}, {
                            "referenceType": "EQ",
                            "referenceValue": "CMAU0323116"
                        }, {"referenceType": "EQ", "referenceValue": "CMAU0875630"}, {
                            "referenceType": "EQ",
                            "referenceValue": "MAGU2239792"
                        }, {"referenceType": "EQ", "referenceValue": "TCLU7252194"}, {
                            "referenceType": "EQ",
                            "referenceValue": "TEMU0227469"
                        }, {"referenceType": "EQ", "referenceValue": "TEMU3240783"}, {
                            "referenceType": "EQ",
                            "referenceValue": "TLLU2806305"
                        }, {"referenceType": "EQ", "referenceValue": "TRHU3662231"}, {
                            "referenceType": "EQ",
                            "referenceValue": "TRLU9614964"
                        }],
                        "equipmentReference": "TEMU0227469"
                    }, {
                        "eventID": "442dc9dea80ed85860ee6f63382c74733dde5fee",
                        "eventCreatedDateTime": "2023-06-11T05:41:07+00:00",
                        "eventType": "EQUIPMENT",
                        "eventClassifierCode": "ACT",
                        "eventDateTime": "2023-06-10T13:49:00-07:00",
                        "carrierSpecificData": {
                            "internalEventCode": "XOF",
                            "internalEventLabel": "Loaded on board",
                            "internalLocationCode": "USLAX",
                            "internalFacilityCode": "USLAXMETS",
                            "transportationPhase": "Export"
                        },
                        "transportCall": {
                            "transportCallID": "9920eeb8-6a1a-4a90-9c3e-7a28461e6a3a",
                            "exportVoyageNumber": "0FTHSN1MA",
                            "facilityCode": "ETS",
                            "facilityCodeListProvider": "SMDG",
                            "modeOfTransport": "VESSEL",
                            "location": {
                                "locationName": "LOS ANGELES, CA",
                                "latitude": "34.05222",
                                "longitude": "-118.24278",
                                "address": {
                                    "name": "389 TERMINAL ISLAND WAY",
                                    "street": "BERTHS 226-236",
                                    "postCode": "90731",
                                    "city": "LOS ANGELES",
                                    "country": "UNITED STATES"
                                }
                            },
                            "vessel": {
                                "vesselIMONumber": "9850848",
                                "vesselName": "EVER FOND",
                                "vesselFlag": "LR",
                                "vesselCallSignNumber": "5LCS5",
                                "vesselOperatorCarrierCode": "EMC"
                            }
                        },
                        "documentReferences": [{
                            "documentReferenceType": "BKG",
                            "documentReferenceValue": "401f423b25b649a73b7b64f232d9a33efcdd1a788e0992edfd8c48449f927dce"
                        }],
                        "equipmentEventTypeCode": "LOAD",
                        "equipmentReference": "TEMU0227469",
                        "ISOEquipmentCode": "22G1",
                        "emptyIndicatorCode": "LADEN",
                        "isoequipmentCode": "22G1"
                    }, {
                        "eventID": "8cff4d531b246339f16174838cfe4f2ec769246b",
                        "eventCreatedDateTime": "2023-05-30T20:09:25+00:00",
                        "eventType": "EQUIPMENT",
                        "eventClassifierCode": "ACT",
                        "eventDateTime": "2023-05-30T12:51:00-07:00",
                        "carrierSpecificData": {
                            "internalEventCode": "XRX",
                            "internalEventLabel": "Gate in at Port terminal",
                            "internalLocationCode": "USLAX",
                            "internalFacilityCode": "USLAXMETS",
                            "transportationPhase": "Export"
                        },
                        "transportCall": {
                            "transportCallID": "f9eef448-20e2-4434-94dd-0191fd6b13a0",
                            "facilityCode": "ETS",
                            "facilityCodeListProvider": "SMDG",
                            "modeOfTransport": "TRUCK",
                            "location": {
                                "locationName": "LOS ANGELES, CA",
                                "latitude": "34.05222",
                                "longitude": "-118.24278",
                                "address": {
                                    "name": "389 TERMINAL ISLAND WAY",
                                    "street": "BERTHS 226-236",
                                    "postCode": "90731",
                                    "city": "LOS ANGELES",
                                    "country": "UNITED STATES"
                                }
                            }
                        },
                        "documentReferences": [{
                            "documentReferenceType": "BKG",
                            "documentReferenceValue": "401f423b25b649a73b7b64f232d9a33efcdd1a788e0992edfd8c48449f927dce"
                        }],
                        "equipmentEventTypeCode": "GTIN",
                        "equipmentReference": "TEMU0227469",
                        "ISOEquipmentCode": "22G1",
                        "emptyIndicatorCode": "LADEN",
                        "isoequipmentCode": "22G1"
                    }, {
                        "eventID": "452236f28eef0e2d5d2d6c87dbfa98007cac81a8",
                        "eventCreatedDateTime": "2023-05-23T05:04:07+00:00",
                        "eventType": "EQUIPMENT",
                        "eventClassifierCode": "ACT",
                        "eventDateTime": "2023-05-22T21:44:00-07:00",
                        "carrierSpecificData": {
                            "internalEventCode": "MOS",
                            "internalEventLabel": "Empty Picked-up at Depot",
                            "internalLocationCode": "USLAX",
                            "internalFacilityCode": "USLAXSRIO",
                            "transportationPhase": "Export"
                        },
                        "transportCall": {
                            "transportCallID": "a5c93170-e096-442f-a849-a1af1143e399",
                            "modeOfTransport": "TRUCK",
                            "location": {
                                "locationName": "LOS ANGELES, CA",
                                "latitude": "34.05222",
                                "longitude": "-118.24278",
                                "address": {
                                    "name": "SUCKOW ROAD",
                                    "postCode": "93516",
                                    "city": "LOS ANGELES",
                                    "country": "UNITED STATES"
                                }
                            }
                        },
                        "documentReferences": [{
                            "documentReferenceType": "BKG",
                            "documentReferenceValue": "401f423b25b649a73b7b64f232d9a33efcdd1a788e0992edfd8c48449f927dce"
                        }],
                        "equipmentEventTypeCode": "GTOT",
                        "equipmentReference": "TEMU0227469",
                        "ISOEquipmentCode": "22G1",
                        "emptyIndicatorCode": "EMPTY",
                        "isoequipmentCode": "22G1"
                    }]
                }, {
                    "containerRef": "TRHU3662231", "equipmentSize": "22G0", "movement": [{
                        "eventID": "0e1e55da0ea7439dd7eb66f9988e8fa0f6a6c1a6",
                        "eventCreatedDateTime": "2023-06-13T02:33:07+00:00",
                        "eventType": "TRANSPORT",
                        "eventClassifierCode": "PLN",
                        "eventDateTime": "2023-07-18T04:18:00+08:00",
                        "carrierSpecificData": {
                            "internalEventCode": "PVA",
                            "internalEventLabel": "Vessel Arrival",
                            "internalLocationCode": "CNSHK",
                            "internalFacilityCode": "CNSHKDSCT",
                            "bookingExportVoyageReference": "0FTHSN1MA",
                            "transportationPhase": "Import",
                            "shipmentLocationType": "POD",
                            "transportCallSequenceTotal": 2,
                            "numberOfUnits": 12
                        },
                        "transportEventTypeCode": "ARRI",
                        "transportCall": {
                            "transportCallID": "50002857703",
                            "importVoyageNumber": "0FTHSN1MA",
                            "transportCallSequenceNumber": 2,
                            "facilityCode": "SCT",
                            "facilityCodeListProvider": "SMDG",
                            "modeOfTransport": "VESSEL",
                            "location": {
                                "locationName": "SHEKOU",
                                "latitude": "22.49639",
                                "longitude": "113.92",
                                "address": {
                                    "name": "JETTY THREE, HARBOUR ROAD,",
                                    "street": ".",
                                    "city": "SHEKOU",
                                    "country": "CHINA"
                                }
                            },
                            "vessel": {
                                "vesselIMONumber": "9850848",
                                "vesselName": "EVER FOND",
                                "vesselFlag": "LR",
                                "vesselCallSignNumber": "5LCS5",
                                "vesselOperatorCarrierCode": "EMC"
                            }
                        },
                        "documentReferences": [{
                            "documentReferenceType": "BKG",
                            "documentReferenceValue": "401f423b25b649a73b7b64f232d9a33efcdd1a788e0992edfd8c48449f927dce"
                        }],
                        "references": [{"referenceType": "EQ", "referenceValue": "APZU3856920"}, {
                            "referenceType": "EQ",
                            "referenceValue": "APZU3936760"
                        }, {"referenceType": "EQ", "referenceValue": "CAIU3707093"}, {
                            "referenceType": "EQ",
                            "referenceValue": "CMAU0323116"
                        }, {"referenceType": "EQ", "referenceValue": "CMAU0875630"}, {
                            "referenceType": "EQ",
                            "referenceValue": "MAGU2239792"
                        }, {"referenceType": "EQ", "referenceValue": "TCLU7252194"}, {
                            "referenceType": "EQ",
                            "referenceValue": "TEMU0227469"
                        }, {"referenceType": "EQ", "referenceValue": "TEMU3240783"}, {
                            "referenceType": "EQ",
                            "referenceValue": "TLLU2806305"
                        }, {"referenceType": "EQ", "referenceValue": "TRHU3662231"}, {
                            "referenceType": "EQ",
                            "referenceValue": "TRLU9614964"
                        }],
                        "equipmentReference": "TRHU3662231"
                    }, {
                        "eventID": "91c2c128b8913862789f84fc9674abe5064d09f7",
                        "eventCreatedDateTime": "2023-06-13T02:33:07+00:00",
                        "eventType": "TRANSPORT",
                        "eventClassifierCode": "PLN",
                        "eventDateTime": "2023-06-11T06:27:00-07:00",
                        "carrierSpecificData": {
                            "internalEventCode": "PVD",
                            "internalEventLabel": "Vessel Departure",
                            "internalLocationCode": "USLAX",
                            "internalFacilityCode": "USLAXMETS",
                            "bookingExportVoyageReference": "0FTHSN1MA",
                            "transportationPhase": "Export",
                            "shipmentLocationType": "POL",
                            "transportCallSequenceTotal": 2,
                            "numberOfUnits": 12
                        },
                        "transportEventTypeCode": "DEPA",
                        "transportCall": {
                            "transportCallID": "50002856834",
                            "exportVoyageNumber": "0FTHSN1MA",
                            "transportCallSequenceNumber": 1,
                            "facilityCode": "ETS",
                            "facilityCodeListProvider": "SMDG",
                            "modeOfTransport": "VESSEL",
                            "location": {
                                "locationName": "LOS ANGELES, CA",
                                "latitude": "34.05222",
                                "longitude": "-118.24278",
                                "address": {
                                    "name": "389 TERMINAL ISLAND WAY",
                                    "street": "BERTHS 226-236",
                                    "postCode": "90731",
                                    "city": "LOS ANGELES",
                                    "country": "UNITED STATES"
                                }
                            },
                            "vessel": {
                                "vesselIMONumber": "9850848",
                                "vesselName": "EVER FOND",
                                "vesselFlag": "LR",
                                "vesselCallSignNumber": "5LCS5",
                                "vesselOperatorCarrierCode": "EMC"
                            }
                        },
                        "documentReferences": [{
                            "documentReferenceType": "BKG",
                            "documentReferenceValue": "401f423b25b649a73b7b64f232d9a33efcdd1a788e0992edfd8c48449f927dce"
                        }],
                        "references": [{"referenceType": "EQ", "referenceValue": "APZU3856920"}, {
                            "referenceType": "EQ",
                            "referenceValue": "APZU3936760"
                        }, {"referenceType": "EQ", "referenceValue": "CAIU3707093"}, {
                            "referenceType": "EQ",
                            "referenceValue": "CMAU0323116"
                        }, {"referenceType": "EQ", "referenceValue": "CMAU0875630"}, {
                            "referenceType": "EQ",
                            "referenceValue": "MAGU2239792"
                        }, {"referenceType": "EQ", "referenceValue": "TCLU7252194"}, {
                            "referenceType": "EQ",
                            "referenceValue": "TEMU0227469"
                        }, {"referenceType": "EQ", "referenceValue": "TEMU3240783"}, {
                            "referenceType": "EQ",
                            "referenceValue": "TLLU2806305"
                        }, {"referenceType": "EQ", "referenceValue": "TRHU3662231"}, {
                            "referenceType": "EQ",
                            "referenceValue": "TRLU9614964"
                        }],
                        "equipmentReference": "TRHU3662231"
                    }, {
                        "eventID": "93be2a319f6bb52aa06bbcd65827c340674e488b",
                        "eventCreatedDateTime": "2023-06-11T03:04:05+00:00",
                        "eventType": "TRANSPORT",
                        "eventClassifierCode": "ACT",
                        "eventDateTime": "2023-06-10T19:00:00-07:00",
                        "carrierSpecificData": {
                            "internalEventCode": "AVD",
                            "internalEventLabel": "Vessel Departure",
                            "internalLocationCode": "USLAX",
                            "internalFacilityCode": "USLAXMETS",
                            "bookingExportVoyageReference": "0FTHSN1MA",
                            "transportationPhase": "Export",
                            "shipmentLocationType": "POL",
                            "transportCallSequenceTotal": 2,
                            "numberOfUnits": 12
                        },
                        "transportEventTypeCode": "DEPA",
                        "transportCall": {
                            "transportCallID": "50002856834",
                            "exportVoyageNumber": "0FTHSN1MA",
                            "transportCallSequenceNumber": 1,
                            "facilityCode": "ETS",
                            "facilityCodeListProvider": "SMDG",
                            "modeOfTransport": "VESSEL",
                            "location": {
                                "locationName": "LOS ANGELES, CA",
                                "latitude": "34.05222",
                                "longitude": "-118.24278",
                                "address": {
                                    "name": "389 TERMINAL ISLAND WAY",
                                    "street": "BERTHS 226-236",
                                    "postCode": "90731",
                                    "city": "LOS ANGELES",
                                    "country": "UNITED STATES"
                                }
                            },
                            "vessel": {
                                "vesselIMONumber": "9850848",
                                "vesselName": "EVER FOND",
                                "vesselFlag": "LR",
                                "vesselCallSignNumber": "5LCS5",
                                "vesselOperatorCarrierCode": "EMC"
                            }
                        },
                        "documentReferences": [{
                            "documentReferenceType": "BKG",
                            "documentReferenceValue": "401f423b25b649a73b7b64f232d9a33efcdd1a788e0992edfd8c48449f927dce"
                        }],
                        "references": [{"referenceType": "EQ", "referenceValue": "APZU3856920"}, {
                            "referenceType": "EQ",
                            "referenceValue": "APZU3936760"
                        }, {"referenceType": "EQ", "referenceValue": "CAIU3707093"}, {
                            "referenceType": "EQ",
                            "referenceValue": "CMAU0323116"
                        }, {"referenceType": "EQ", "referenceValue": "CMAU0875630"}, {
                            "referenceType": "EQ",
                            "referenceValue": "MAGU2239792"
                        }, {"referenceType": "EQ", "referenceValue": "TCLU7252194"}, {
                            "referenceType": "EQ",
                            "referenceValue": "TEMU0227469"
                        }, {"referenceType": "EQ", "referenceValue": "TEMU3240783"}, {
                            "referenceType": "EQ",
                            "referenceValue": "TLLU2806305"
                        }, {"referenceType": "EQ", "referenceValue": "TRHU3662231"}, {
                            "referenceType": "EQ",
                            "referenceValue": "TRLU9614964"
                        }],
                        "equipmentReference": "TRHU3662231"
                    }, {
                        "eventID": "705039c09357345fbfdb59aad09e89377d1d95b4",
                        "eventCreatedDateTime": "2023-06-11T05:39:32+00:00",
                        "eventType": "EQUIPMENT",
                        "eventClassifierCode": "ACT",
                        "eventDateTime": "2023-06-10T13:47:00-07:00",
                        "carrierSpecificData": {
                            "internalEventCode": "XOF",
                            "internalEventLabel": "Loaded on board",
                            "internalLocationCode": "USLAX",
                            "internalFacilityCode": "USLAXMETS",
                            "transportationPhase": "Export"
                        },
                        "transportCall": {
                            "transportCallID": "401f3ca1-933e-4494-bc06-0c58ce442bdf",
                            "exportVoyageNumber": "0FTHSN1MA",
                            "facilityCode": "ETS",
                            "facilityCodeListProvider": "SMDG",
                            "modeOfTransport": "VESSEL",
                            "location": {
                                "locationName": "LOS ANGELES, CA",
                                "latitude": "34.05222",
                                "longitude": "-118.24278",
                                "address": {
                                    "name": "389 TERMINAL ISLAND WAY",
                                    "street": "BERTHS 226-236",
                                    "postCode": "90731",
                                    "city": "LOS ANGELES",
                                    "country": "UNITED STATES"
                                }
                            },
                            "vessel": {
                                "vesselIMONumber": "9850848",
                                "vesselName": "EVER FOND",
                                "vesselFlag": "LR",
                                "vesselCallSignNumber": "5LCS5",
                                "vesselOperatorCarrierCode": "EMC"
                            }
                        },
                        "documentReferences": [{
                            "documentReferenceType": "BKG",
                            "documentReferenceValue": "401f423b25b649a73b7b64f232d9a33efcdd1a788e0992edfd8c48449f927dce"
                        }],
                        "equipmentEventTypeCode": "LOAD",
                        "equipmentReference": "TRHU3662231",
                        "ISOEquipmentCode": "22G0",
                        "emptyIndicatorCode": "LADEN",
                        "isoequipmentCode": "22G0"
                    }, {
                        "eventID": "7fd1acfe95575a008d574f5a45d066d5845e3171",
                        "eventCreatedDateTime": "2023-05-31T06:15:45+00:00",
                        "eventType": "EQUIPMENT",
                        "eventClassifierCode": "ACT",
                        "eventDateTime": "2023-05-30T22:42:00-07:00",
                        "carrierSpecificData": {
                            "internalEventCode": "XRX",
                            "internalEventLabel": "Gate in at Port terminal",
                            "internalLocationCode": "USLAX",
                            "internalFacilityCode": "USLAXMETS",
                            "transportationPhase": "Export"
                        },
                        "transportCall": {
                            "transportCallID": "6668b268-a80a-4cb6-bc99-d8539d5205a3",
                            "facilityCode": "ETS",
                            "facilityCodeListProvider": "SMDG",
                            "modeOfTransport": "TRUCK",
                            "location": {
                                "locationName": "LOS ANGELES, CA",
                                "latitude": "34.05222",
                                "longitude": "-118.24278",
                                "address": {
                                    "name": "389 TERMINAL ISLAND WAY",
                                    "street": "BERTHS 226-236",
                                    "postCode": "90731",
                                    "city": "LOS ANGELES",
                                    "country": "UNITED STATES"
                                }
                            }
                        },
                        "documentReferences": [{
                            "documentReferenceType": "BKG",
                            "documentReferenceValue": "401f423b25b649a73b7b64f232d9a33efcdd1a788e0992edfd8c48449f927dce"
                        }],
                        "equipmentEventTypeCode": "GTIN",
                        "equipmentReference": "TRHU3662231",
                        "ISOEquipmentCode": "22G0",
                        "emptyIndicatorCode": "LADEN",
                        "isoequipmentCode": "22G0"
                    }, {
                        "eventID": "0f93f23b68f3847cd51575838a45572c837c98b0",
                        "eventCreatedDateTime": "2023-05-16T18:37:02+00:00",
                        "eventType": "EQUIPMENT",
                        "eventClassifierCode": "ACT",
                        "eventDateTime": "2023-05-16T11:21:00-07:00",
                        "carrierSpecificData": {
                            "internalEventCode": "MOS",
                            "internalEventLabel": "Empty Picked-up at Depot",
                            "internalLocationCode": "USLAX",
                            "internalFacilityCode": "USLAXSRIO",
                            "transportationPhase": "Export"
                        },
                        "transportCall": {
                            "transportCallID": "6be84cff-1ccd-47b2-bfa4-7a73d49a7554",
                            "modeOfTransport": "TRUCK",
                            "location": {
                                "locationName": "LOS ANGELES, CA",
                                "latitude": "34.05222",
                                "longitude": "-118.24278",
                                "address": {
                                    "name": "SUCKOW ROAD",
                                    "postCode": "93516",
                                    "city": "LOS ANGELES",
                                    "country": "UNITED STATES"
                                }
                            }
                        },
                        "documentReferences": [{
                            "documentReferenceType": "BKG",
                            "documentReferenceValue": "401f423b25b649a73b7b64f232d9a33efcdd1a788e0992edfd8c48449f927dce"
                        }],
                        "equipmentEventTypeCode": "GTOT",
                        "equipmentReference": "TRHU3662231",
                        "ISOEquipmentCode": "22G0",
                        "emptyIndicatorCode": "EMPTY",
                        "isoequipmentCode": "22G0"
                    }]
                }, {
                    "containerRef": "CMAU0323116", "equipmentSize": "22G1", "movement": [{
                        "eventID": "0e1e55da0ea7439dd7eb66f9988e8fa0f6a6c1a6",
                        "eventCreatedDateTime": "2023-06-13T02:33:07+00:00",
                        "eventType": "TRANSPORT",
                        "eventClassifierCode": "PLN",
                        "eventDateTime": "2023-07-18T04:18:00+08:00",
                        "carrierSpecificData": {
                            "internalEventCode": "PVA",
                            "internalEventLabel": "Vessel Arrival",
                            "internalLocationCode": "CNSHK",
                            "internalFacilityCode": "CNSHKDSCT",
                            "bookingExportVoyageReference": "0FTHSN1MA",
                            "transportationPhase": "Import",
                            "shipmentLocationType": "POD",
                            "transportCallSequenceTotal": 2,
                            "numberOfUnits": 12
                        },
                        "transportEventTypeCode": "ARRI",
                        "transportCall": {
                            "transportCallID": "50002857703",
                            "importVoyageNumber": "0FTHSN1MA",
                            "transportCallSequenceNumber": 2,
                            "facilityCode": "SCT",
                            "facilityCodeListProvider": "SMDG",
                            "modeOfTransport": "VESSEL",
                            "location": {
                                "locationName": "SHEKOU",
                                "latitude": "22.49639",
                                "longitude": "113.92",
                                "address": {
                                    "name": "JETTY THREE, HARBOUR ROAD,",
                                    "street": ".",
                                    "city": "SHEKOU",
                                    "country": "CHINA"
                                }
                            },
                            "vessel": {
                                "vesselIMONumber": "9850848",
                                "vesselName": "EVER FOND",
                                "vesselFlag": "LR",
                                "vesselCallSignNumber": "5LCS5",
                                "vesselOperatorCarrierCode": "EMC"
                            }
                        },
                        "documentReferences": [{
                            "documentReferenceType": "BKG",
                            "documentReferenceValue": "401f423b25b649a73b7b64f232d9a33efcdd1a788e0992edfd8c48449f927dce"
                        }],
                        "references": [{"referenceType": "EQ", "referenceValue": "APZU3856920"}, {
                            "referenceType": "EQ",
                            "referenceValue": "APZU3936760"
                        }, {"referenceType": "EQ", "referenceValue": "CAIU3707093"}, {
                            "referenceType": "EQ",
                            "referenceValue": "CMAU0323116"
                        }, {"referenceType": "EQ", "referenceValue": "CMAU0875630"}, {
                            "referenceType": "EQ",
                            "referenceValue": "MAGU2239792"
                        }, {"referenceType": "EQ", "referenceValue": "TCLU7252194"}, {
                            "referenceType": "EQ",
                            "referenceValue": "TEMU0227469"
                        }, {"referenceType": "EQ", "referenceValue": "TEMU3240783"}, {
                            "referenceType": "EQ",
                            "referenceValue": "TLLU2806305"
                        }, {"referenceType": "EQ", "referenceValue": "TRHU3662231"}, {
                            "referenceType": "EQ",
                            "referenceValue": "TRLU9614964"
                        }],
                        "equipmentReference": "CMAU0323116"
                    }, {
                        "eventID": "91c2c128b8913862789f84fc9674abe5064d09f7",
                        "eventCreatedDateTime": "2023-06-13T02:33:07+00:00",
                        "eventType": "TRANSPORT",
                        "eventClassifierCode": "PLN",
                        "eventDateTime": "2023-06-11T06:27:00-07:00",
                        "carrierSpecificData": {
                            "internalEventCode": "PVD",
                            "internalEventLabel": "Vessel Departure",
                            "internalLocationCode": "USLAX",
                            "internalFacilityCode": "USLAXMETS",
                            "bookingExportVoyageReference": "0FTHSN1MA",
                            "transportationPhase": "Export",
                            "shipmentLocationType": "POL",
                            "transportCallSequenceTotal": 2,
                            "numberOfUnits": 12
                        },
                        "transportEventTypeCode": "DEPA",
                        "transportCall": {
                            "transportCallID": "50002856834",
                            "exportVoyageNumber": "0FTHSN1MA",
                            "transportCallSequenceNumber": 1,
                            "facilityCode": "ETS",
                            "facilityCodeListProvider": "SMDG",
                            "modeOfTransport": "VESSEL",
                            "location": {
                                "locationName": "LOS ANGELES, CA",
                                "latitude": "34.05222",
                                "longitude": "-118.24278",
                                "address": {
                                    "name": "389 TERMINAL ISLAND WAY",
                                    "street": "BERTHS 226-236",
                                    "postCode": "90731",
                                    "city": "LOS ANGELES",
                                    "country": "UNITED STATES"
                                }
                            },
                            "vessel": {
                                "vesselIMONumber": "9850848",
                                "vesselName": "EVER FOND",
                                "vesselFlag": "LR",
                                "vesselCallSignNumber": "5LCS5",
                                "vesselOperatorCarrierCode": "EMC"
                            }
                        },
                        "documentReferences": [{
                            "documentReferenceType": "BKG",
                            "documentReferenceValue": "401f423b25b649a73b7b64f232d9a33efcdd1a788e0992edfd8c48449f927dce"
                        }],
                        "references": [{"referenceType": "EQ", "referenceValue": "APZU3856920"}, {
                            "referenceType": "EQ",
                            "referenceValue": "APZU3936760"
                        }, {"referenceType": "EQ", "referenceValue": "CAIU3707093"}, {
                            "referenceType": "EQ",
                            "referenceValue": "CMAU0323116"
                        }, {"referenceType": "EQ", "referenceValue": "CMAU0875630"}, {
                            "referenceType": "EQ",
                            "referenceValue": "MAGU2239792"
                        }, {"referenceType": "EQ", "referenceValue": "TCLU7252194"}, {
                            "referenceType": "EQ",
                            "referenceValue": "TEMU0227469"
                        }, {"referenceType": "EQ", "referenceValue": "TEMU3240783"}, {
                            "referenceType": "EQ",
                            "referenceValue": "TLLU2806305"
                        }, {"referenceType": "EQ", "referenceValue": "TRHU3662231"}, {
                            "referenceType": "EQ",
                            "referenceValue": "TRLU9614964"
                        }],
                        "equipmentReference": "CMAU0323116"
                    }, {
                        "eventID": "93be2a319f6bb52aa06bbcd65827c340674e488b",
                        "eventCreatedDateTime": "2023-06-11T03:04:05+00:00",
                        "eventType": "TRANSPORT",
                        "eventClassifierCode": "ACT",
                        "eventDateTime": "2023-06-10T19:00:00-07:00",
                        "carrierSpecificData": {
                            "internalEventCode": "AVD",
                            "internalEventLabel": "Vessel Departure",
                            "internalLocationCode": "USLAX",
                            "internalFacilityCode": "USLAXMETS",
                            "bookingExportVoyageReference": "0FTHSN1MA",
                            "transportationPhase": "Export",
                            "shipmentLocationType": "POL",
                            "transportCallSequenceTotal": 2,
                            "numberOfUnits": 12
                        },
                        "transportEventTypeCode": "DEPA",
                        "transportCall": {
                            "transportCallID": "50002856834",
                            "exportVoyageNumber": "0FTHSN1MA",
                            "transportCallSequenceNumber": 1,
                            "facilityCode": "ETS",
                            "facilityCodeListProvider": "SMDG",
                            "modeOfTransport": "VESSEL",
                            "location": {
                                "locationName": "LOS ANGELES, CA",
                                "latitude": "34.05222",
                                "longitude": "-118.24278",
                                "address": {
                                    "name": "389 TERMINAL ISLAND WAY",
                                    "street": "BERTHS 226-236",
                                    "postCode": "90731",
                                    "city": "LOS ANGELES",
                                    "country": "UNITED STATES"
                                }
                            },
                            "vessel": {
                                "vesselIMONumber": "9850848",
                                "vesselName": "EVER FOND",
                                "vesselFlag": "LR",
                                "vesselCallSignNumber": "5LCS5",
                                "vesselOperatorCarrierCode": "EMC"
                            }
                        },
                        "documentReferences": [{
                            "documentReferenceType": "BKG",
                            "documentReferenceValue": "401f423b25b649a73b7b64f232d9a33efcdd1a788e0992edfd8c48449f927dce"
                        }],
                        "references": [{"referenceType": "EQ", "referenceValue": "APZU3856920"}, {
                            "referenceType": "EQ",
                            "referenceValue": "APZU3936760"
                        }, {"referenceType": "EQ", "referenceValue": "CAIU3707093"}, {
                            "referenceType": "EQ",
                            "referenceValue": "CMAU0323116"
                        }, {"referenceType": "EQ", "referenceValue": "CMAU0875630"}, {
                            "referenceType": "EQ",
                            "referenceValue": "MAGU2239792"
                        }, {"referenceType": "EQ", "referenceValue": "TCLU7252194"}, {
                            "referenceType": "EQ",
                            "referenceValue": "TEMU0227469"
                        }, {"referenceType": "EQ", "referenceValue": "TEMU3240783"}, {
                            "referenceType": "EQ",
                            "referenceValue": "TLLU2806305"
                        }, {"referenceType": "EQ", "referenceValue": "TRHU3662231"}, {
                            "referenceType": "EQ",
                            "referenceValue": "TRLU9614964"
                        }],
                        "equipmentReference": "CMAU0323116"
                    }, {
                        "eventID": "a95fa75cfa266dfc61a56dcac7fbc45fe23c8061",
                        "eventCreatedDateTime": "2023-06-11T05:41:32+00:00",
                        "eventType": "EQUIPMENT",
                        "eventClassifierCode": "ACT",
                        "eventDateTime": "2023-06-10T13:43:00-07:00",
                        "carrierSpecificData": {
                            "internalEventCode": "XOF",
                            "internalEventLabel": "Loaded on board",
                            "internalLocationCode": "USLAX",
                            "internalFacilityCode": "USLAXMETS",
                            "transportationPhase": "Export"
                        },
                        "transportCall": {
                            "transportCallID": "c1090998-9f2b-455f-98e9-58a53c7fdfdf",
                            "exportVoyageNumber": "0FTHSN1MA",
                            "facilityCode": "ETS",
                            "facilityCodeListProvider": "SMDG",
                            "modeOfTransport": "VESSEL",
                            "location": {
                                "locationName": "LOS ANGELES, CA",
                                "latitude": "34.05222",
                                "longitude": "-118.24278",
                                "address": {
                                    "name": "389 TERMINAL ISLAND WAY",
                                    "street": "BERTHS 226-236",
                                    "postCode": "90731",
                                    "city": "LOS ANGELES",
                                    "country": "UNITED STATES"
                                }
                            },
                            "vessel": {
                                "vesselIMONumber": "9850848",
                                "vesselName": "EVER FOND",
                                "vesselFlag": "LR",
                                "vesselCallSignNumber": "5LCS5",
                                "vesselOperatorCarrierCode": "EMC"
                            }
                        },
                        "documentReferences": [{
                            "documentReferenceType": "BKG",
                            "documentReferenceValue": "401f423b25b649a73b7b64f232d9a33efcdd1a788e0992edfd8c48449f927dce"
                        }],
                        "equipmentEventTypeCode": "LOAD",
                        "equipmentReference": "CMAU0323116",
                        "ISOEquipmentCode": "22G1",
                        "emptyIndicatorCode": "LADEN",
                        "isoequipmentCode": "22G1"
                    }, {
                        "eventID": "2c461721624b92d6beff9fe490273edadefc4f2a",
                        "eventCreatedDateTime": "2023-05-31T03:48:08+00:00",
                        "eventType": "EQUIPMENT",
                        "eventClassifierCode": "ACT",
                        "eventDateTime": "2023-05-30T20:25:00-07:00",
                        "carrierSpecificData": {
                            "internalEventCode": "XRX",
                            "internalEventLabel": "Gate in at Port terminal",
                            "internalLocationCode": "USLAX",
                            "internalFacilityCode": "USLAXMETS",
                            "transportationPhase": "Export"
                        },
                        "transportCall": {
                            "transportCallID": "29438cd8-e7cf-4e7a-bfa6-4acab9827d02",
                            "facilityCode": "ETS",
                            "facilityCodeListProvider": "SMDG",
                            "modeOfTransport": "TRUCK",
                            "location": {
                                "locationName": "LOS ANGELES, CA",
                                "latitude": "34.05222",
                                "longitude": "-118.24278",
                                "address": {
                                    "name": "389 TERMINAL ISLAND WAY",
                                    "street": "BERTHS 226-236",
                                    "postCode": "90731",
                                    "city": "LOS ANGELES",
                                    "country": "UNITED STATES"
                                }
                            }
                        },
                        "documentReferences": [{
                            "documentReferenceType": "BKG",
                            "documentReferenceValue": "401f423b25b649a73b7b64f232d9a33efcdd1a788e0992edfd8c48449f927dce"
                        }],
                        "equipmentEventTypeCode": "GTIN",
                        "equipmentReference": "CMAU0323116",
                        "ISOEquipmentCode": "22G1",
                        "emptyIndicatorCode": "LADEN",
                        "isoequipmentCode": "22G1"
                    }, {
                        "eventID": "55fa12a4bb46a381c378f24a7f5342dfbad79c3e",
                        "eventCreatedDateTime": "2023-05-26T03:36:13+00:00",
                        "eventType": "EQUIPMENT",
                        "eventClassifierCode": "ACT",
                        "eventDateTime": "2023-05-25T20:15:00-07:00",
                        "carrierSpecificData": {
                            "internalEventCode": "MOS",
                            "internalEventLabel": "Empty Picked-up at Depot",
                            "internalLocationCode": "USLAX",
                            "internalFacilityCode": "USLAXSRIO",
                            "transportationPhase": "Export"
                        },
                        "transportCall": {
                            "transportCallID": "83886c8c-96d0-4d77-90ed-9f4ad7fdfb33",
                            "modeOfTransport": "TRUCK",
                            "location": {
                                "locationName": "LOS ANGELES, CA",
                                "latitude": "34.05222",
                                "longitude": "-118.24278",
                                "address": {
                                    "name": "SUCKOW ROAD",
                                    "postCode": "93516",
                                    "city": "LOS ANGELES",
                                    "country": "UNITED STATES"
                                }
                            }
                        },
                        "documentReferences": [{
                            "documentReferenceType": "BKG",
                            "documentReferenceValue": "401f423b25b649a73b7b64f232d9a33efcdd1a788e0992edfd8c48449f927dce"
                        }],
                        "equipmentEventTypeCode": "GTOT",
                        "equipmentReference": "CMAU0323116",
                        "ISOEquipmentCode": "22G1",
                        "emptyIndicatorCode": "EMPTY",
                        "isoequipmentCode": "22G1"
                    }]
                }, {
                    "containerRef": "TRLU9614964", "equipmentSize": "22G1", "movement": [{
                        "eventID": "0e1e55da0ea7439dd7eb66f9988e8fa0f6a6c1a6",
                        "eventCreatedDateTime": "2023-06-13T02:33:07+00:00",
                        "eventType": "TRANSPORT",
                        "eventClassifierCode": "PLN",
                        "eventDateTime": "2023-07-18T04:18:00+08:00",
                        "carrierSpecificData": {
                            "internalEventCode": "PVA",
                            "internalEventLabel": "Vessel Arrival",
                            "internalLocationCode": "CNSHK",
                            "internalFacilityCode": "CNSHKDSCT",
                            "bookingExportVoyageReference": "0FTHSN1MA",
                            "transportationPhase": "Import",
                            "shipmentLocationType": "POD",
                            "transportCallSequenceTotal": 2,
                            "numberOfUnits": 12
                        },
                        "transportEventTypeCode": "ARRI",
                        "transportCall": {
                            "transportCallID": "50002857703",
                            "importVoyageNumber": "0FTHSN1MA",
                            "transportCallSequenceNumber": 2,
                            "facilityCode": "SCT",
                            "facilityCodeListProvider": "SMDG",
                            "modeOfTransport": "VESSEL",
                            "location": {
                                "locationName": "SHEKOU",
                                "latitude": "22.49639",
                                "longitude": "113.92",
                                "address": {
                                    "name": "JETTY THREE, HARBOUR ROAD,",
                                    "street": ".",
                                    "city": "SHEKOU",
                                    "country": "CHINA"
                                }
                            },
                            "vessel": {
                                "vesselIMONumber": "9850848",
                                "vesselName": "EVER FOND",
                                "vesselFlag": "LR",
                                "vesselCallSignNumber": "5LCS5",
                                "vesselOperatorCarrierCode": "EMC"
                            }
                        },
                        "documentReferences": [{
                            "documentReferenceType": "BKG",
                            "documentReferenceValue": "401f423b25b649a73b7b64f232d9a33efcdd1a788e0992edfd8c48449f927dce"
                        }],
                        "references": [{"referenceType": "EQ", "referenceValue": "APZU3856920"}, {
                            "referenceType": "EQ",
                            "referenceValue": "APZU3936760"
                        }, {"referenceType": "EQ", "referenceValue": "CAIU3707093"}, {
                            "referenceType": "EQ",
                            "referenceValue": "CMAU0323116"
                        }, {"referenceType": "EQ", "referenceValue": "CMAU0875630"}, {
                            "referenceType": "EQ",
                            "referenceValue": "MAGU2239792"
                        }, {"referenceType": "EQ", "referenceValue": "TCLU7252194"}, {
                            "referenceType": "EQ",
                            "referenceValue": "TEMU0227469"
                        }, {"referenceType": "EQ", "referenceValue": "TEMU3240783"}, {
                            "referenceType": "EQ",
                            "referenceValue": "TLLU2806305"
                        }, {"referenceType": "EQ", "referenceValue": "TRHU3662231"}, {
                            "referenceType": "EQ",
                            "referenceValue": "TRLU9614964"
                        }],
                        "equipmentReference": "TRLU9614964"
                    }, {
                        "eventID": "91c2c128b8913862789f84fc9674abe5064d09f7",
                        "eventCreatedDateTime": "2023-06-13T02:33:07+00:00",
                        "eventType": "TRANSPORT",
                        "eventClassifierCode": "PLN",
                        "eventDateTime": "2023-06-11T06:27:00-07:00",
                        "carrierSpecificData": {
                            "internalEventCode": "PVD",
                            "internalEventLabel": "Vessel Departure",
                            "internalLocationCode": "USLAX",
                            "internalFacilityCode": "USLAXMETS",
                            "bookingExportVoyageReference": "0FTHSN1MA",
                            "transportationPhase": "Export",
                            "shipmentLocationType": "POL",
                            "transportCallSequenceTotal": 2,
                            "numberOfUnits": 12
                        },
                        "transportEventTypeCode": "DEPA",
                        "transportCall": {
                            "transportCallID": "50002856834",
                            "exportVoyageNumber": "0FTHSN1MA",
                            "transportCallSequenceNumber": 1,
                            "facilityCode": "ETS",
                            "facilityCodeListProvider": "SMDG",
                            "modeOfTransport": "VESSEL",
                            "location": {
                                "locationName": "LOS ANGELES, CA",
                                "latitude": "34.05222",
                                "longitude": "-118.24278",
                                "address": {
                                    "name": "389 TERMINAL ISLAND WAY",
                                    "street": "BERTHS 226-236",
                                    "postCode": "90731",
                                    "city": "LOS ANGELES",
                                    "country": "UNITED STATES"
                                }
                            },
                            "vessel": {
                                "vesselIMONumber": "9850848",
                                "vesselName": "EVER FOND",
                                "vesselFlag": "LR",
                                "vesselCallSignNumber": "5LCS5",
                                "vesselOperatorCarrierCode": "EMC"
                            }
                        },
                        "documentReferences": [{
                            "documentReferenceType": "BKG",
                            "documentReferenceValue": "401f423b25b649a73b7b64f232d9a33efcdd1a788e0992edfd8c48449f927dce"
                        }],
                        "references": [{"referenceType": "EQ", "referenceValue": "APZU3856920"}, {
                            "referenceType": "EQ",
                            "referenceValue": "APZU3936760"
                        }, {"referenceType": "EQ", "referenceValue": "CAIU3707093"}, {
                            "referenceType": "EQ",
                            "referenceValue": "CMAU0323116"
                        }, {"referenceType": "EQ", "referenceValue": "CMAU0875630"}, {
                            "referenceType": "EQ",
                            "referenceValue": "MAGU2239792"
                        }, {"referenceType": "EQ", "referenceValue": "TCLU7252194"}, {
                            "referenceType": "EQ",
                            "referenceValue": "TEMU0227469"
                        }, {"referenceType": "EQ", "referenceValue": "TEMU3240783"}, {
                            "referenceType": "EQ",
                            "referenceValue": "TLLU2806305"
                        }, {"referenceType": "EQ", "referenceValue": "TRHU3662231"}, {
                            "referenceType": "EQ",
                            "referenceValue": "TRLU9614964"
                        }],
                        "equipmentReference": "TRLU9614964"
                    }, {
                        "eventID": "93be2a319f6bb52aa06bbcd65827c340674e488b",
                        "eventCreatedDateTime": "2023-06-11T03:04:05+00:00",
                        "eventType": "TRANSPORT",
                        "eventClassifierCode": "ACT",
                        "eventDateTime": "2023-06-10T19:00:00-07:00",
                        "carrierSpecificData": {
                            "internalEventCode": "AVD",
                            "internalEventLabel": "Vessel Departure",
                            "internalLocationCode": "USLAX",
                            "internalFacilityCode": "USLAXMETS",
                            "bookingExportVoyageReference": "0FTHSN1MA",
                            "transportationPhase": "Export",
                            "shipmentLocationType": "POL",
                            "transportCallSequenceTotal": 2,
                            "numberOfUnits": 12
                        },
                        "transportEventTypeCode": "DEPA",
                        "transportCall": {
                            "transportCallID": "50002856834",
                            "exportVoyageNumber": "0FTHSN1MA",
                            "transportCallSequenceNumber": 1,
                            "facilityCode": "ETS",
                            "facilityCodeListProvider": "SMDG",
                            "modeOfTransport": "VESSEL",
                            "location": {
                                "locationName": "LOS ANGELES, CA",
                                "latitude": "34.05222",
                                "longitude": "-118.24278",
                                "address": {
                                    "name": "389 TERMINAL ISLAND WAY",
                                    "street": "BERTHS 226-236",
                                    "postCode": "90731",
                                    "city": "LOS ANGELES",
                                    "country": "UNITED STATES"
                                }
                            },
                            "vessel": {
                                "vesselIMONumber": "9850848",
                                "vesselName": "EVER FOND",
                                "vesselFlag": "LR",
                                "vesselCallSignNumber": "5LCS5",
                                "vesselOperatorCarrierCode": "EMC"
                            }
                        },
                        "documentReferences": [{
                            "documentReferenceType": "BKG",
                            "documentReferenceValue": "401f423b25b649a73b7b64f232d9a33efcdd1a788e0992edfd8c48449f927dce"
                        }],
                        "references": [{"referenceType": "EQ", "referenceValue": "APZU3856920"}, {
                            "referenceType": "EQ",
                            "referenceValue": "APZU3936760"
                        }, {"referenceType": "EQ", "referenceValue": "CAIU3707093"}, {
                            "referenceType": "EQ",
                            "referenceValue": "CMAU0323116"
                        }, {"referenceType": "EQ", "referenceValue": "CMAU0875630"}, {
                            "referenceType": "EQ",
                            "referenceValue": "MAGU2239792"
                        }, {"referenceType": "EQ", "referenceValue": "TCLU7252194"}, {
                            "referenceType": "EQ",
                            "referenceValue": "TEMU0227469"
                        }, {"referenceType": "EQ", "referenceValue": "TEMU3240783"}, {
                            "referenceType": "EQ",
                            "referenceValue": "TLLU2806305"
                        }, {"referenceType": "EQ", "referenceValue": "TRHU3662231"}, {
                            "referenceType": "EQ",
                            "referenceValue": "TRLU9614964"
                        }],
                        "equipmentReference": "TRLU9614964"
                    }, {
                        "eventID": "f07e291e7e40612b0cdf81f093a5b4ac27d68230",
                        "eventCreatedDateTime": "2023-06-11T05:41:18+00:00",
                        "eventType": "EQUIPMENT",
                        "eventClassifierCode": "ACT",
                        "eventDateTime": "2023-06-10T13:45:00-07:00",
                        "carrierSpecificData": {
                            "internalEventCode": "XOF",
                            "internalEventLabel": "Loaded on board",
                            "internalLocationCode": "USLAX",
                            "internalFacilityCode": "USLAXMETS",
                            "transportationPhase": "Export"
                        },
                        "transportCall": {
                            "transportCallID": "85681623-a21e-4752-91fd-aba87e3964c9",
                            "exportVoyageNumber": "0FTHSN1MA",
                            "facilityCode": "ETS",
                            "facilityCodeListProvider": "SMDG",
                            "modeOfTransport": "VESSEL",
                            "location": {
                                "locationName": "LOS ANGELES, CA",
                                "latitude": "34.05222",
                                "longitude": "-118.24278",
                                "address": {
                                    "name": "389 TERMINAL ISLAND WAY",
                                    "street": "BERTHS 226-236",
                                    "postCode": "90731",
                                    "city": "LOS ANGELES",
                                    "country": "UNITED STATES"
                                }
                            },
                            "vessel": {
                                "vesselIMONumber": "9850848",
                                "vesselName": "EVER FOND",
                                "vesselFlag": "LR",
                                "vesselCallSignNumber": "5LCS5",
                                "vesselOperatorCarrierCode": "EMC"
                            }
                        },
                        "documentReferences": [{
                            "documentReferenceType": "BKG",
                            "documentReferenceValue": "401f423b25b649a73b7b64f232d9a33efcdd1a788e0992edfd8c48449f927dce"
                        }],
                        "equipmentEventTypeCode": "LOAD",
                        "equipmentReference": "TRLU9614964",
                        "ISOEquipmentCode": "22G1",
                        "emptyIndicatorCode": "LADEN",
                        "isoequipmentCode": "22G1"
                    }, {
                        "eventID": "de7c3b3cc3b5d3571eeb82820ad6fc914699856e",
                        "eventCreatedDateTime": "2023-05-31T05:29:12+00:00",
                        "eventType": "EQUIPMENT",
                        "eventClassifierCode": "ACT",
                        "eventDateTime": "2023-05-30T22:11:00-07:00",
                        "carrierSpecificData": {
                            "internalEventCode": "XRX",
                            "internalEventLabel": "Gate in at Port terminal",
                            "internalLocationCode": "USLAX",
                            "internalFacilityCode": "USLAXMETS",
                            "transportationPhase": "Export"
                        },
                        "transportCall": {
                            "transportCallID": "ff679929-7362-473e-a2a4-5caa9618cc3b",
                            "facilityCode": "ETS",
                            "facilityCodeListProvider": "SMDG",
                            "modeOfTransport": "TRUCK",
                            "location": {
                                "locationName": "LOS ANGELES, CA",
                                "latitude": "34.05222",
                                "longitude": "-118.24278",
                                "address": {
                                    "name": "389 TERMINAL ISLAND WAY",
                                    "street": "BERTHS 226-236",
                                    "postCode": "90731",
                                    "city": "LOS ANGELES",
                                    "country": "UNITED STATES"
                                }
                            }
                        },
                        "documentReferences": [{
                            "documentReferenceType": "BKG",
                            "documentReferenceValue": "401f423b25b649a73b7b64f232d9a33efcdd1a788e0992edfd8c48449f927dce"
                        }],
                        "equipmentEventTypeCode": "GTIN",
                        "equipmentReference": "TRLU9614964",
                        "ISOEquipmentCode": "22G1",
                        "emptyIndicatorCode": "LADEN",
                        "isoequipmentCode": "22G1"
                    }, {
                        "eventID": "157b5c0424c3f51a1cd3937f186bac6d832082da",
                        "eventCreatedDateTime": "2023-05-24T06:49:19+00:00",
                        "eventType": "EQUIPMENT",
                        "eventClassifierCode": "ACT",
                        "eventDateTime": "2023-05-23T23:35:00-07:00",
                        "carrierSpecificData": {
                            "internalEventCode": "MOS",
                            "internalEventLabel": "Empty Picked-up at Depot",
                            "internalLocationCode": "USLAX",
                            "internalFacilityCode": "USLAXSRIO",
                            "transportationPhase": "Export"
                        },
                        "transportCall": {
                            "transportCallID": "f6970c0c-28db-4c93-b3fd-9665aef0a174",
                            "modeOfTransport": "TRUCK",
                            "location": {
                                "locationName": "LOS ANGELES, CA",
                                "latitude": "34.05222",
                                "longitude": "-118.24278",
                                "address": {
                                    "name": "SUCKOW ROAD",
                                    "postCode": "93516",
                                    "city": "LOS ANGELES",
                                    "country": "UNITED STATES"
                                }
                            }
                        },
                        "documentReferences": [{
                            "documentReferenceType": "BKG",
                            "documentReferenceValue": "401f423b25b649a73b7b64f232d9a33efcdd1a788e0992edfd8c48449f927dce"
                        }],
                        "equipmentEventTypeCode": "GTOT",
                        "equipmentReference": "TRLU9614964",
                        "ISOEquipmentCode": "22G1",
                        "emptyIndicatorCode": "EMPTY",
                        "isoequipmentCode": "22G1"
                    }]
                }, {
                    "containerRef": "MAGU2239792", "equipmentSize": "22G1", "movement": [{
                        "eventID": "0e1e55da0ea7439dd7eb66f9988e8fa0f6a6c1a6",
                        "eventCreatedDateTime": "2023-06-13T02:33:07+00:00",
                        "eventType": "TRANSPORT",
                        "eventClassifierCode": "PLN",
                        "eventDateTime": "2023-07-18T04:18:00+08:00",
                        "carrierSpecificData": {
                            "internalEventCode": "PVA",
                            "internalEventLabel": "Vessel Arrival",
                            "internalLocationCode": "CNSHK",
                            "internalFacilityCode": "CNSHKDSCT",
                            "bookingExportVoyageReference": "0FTHSN1MA",
                            "transportationPhase": "Import",
                            "shipmentLocationType": "POD",
                            "transportCallSequenceTotal": 2,
                            "numberOfUnits": 12
                        },
                        "transportEventTypeCode": "ARRI",
                        "transportCall": {
                            "transportCallID": "50002857703",
                            "importVoyageNumber": "0FTHSN1MA",
                            "transportCallSequenceNumber": 2,
                            "facilityCode": "SCT",
                            "facilityCodeListProvider": "SMDG",
                            "modeOfTransport": "VESSEL",
                            "location": {
                                "locationName": "SHEKOU",
                                "latitude": "22.49639",
                                "longitude": "113.92",
                                "address": {
                                    "name": "JETTY THREE, HARBOUR ROAD,",
                                    "street": ".",
                                    "city": "SHEKOU",
                                    "country": "CHINA"
                                }
                            },
                            "vessel": {
                                "vesselIMONumber": "9850848",
                                "vesselName": "EVER FOND",
                                "vesselFlag": "LR",
                                "vesselCallSignNumber": "5LCS5",
                                "vesselOperatorCarrierCode": "EMC"
                            }
                        },
                        "documentReferences": [{
                            "documentReferenceType": "BKG",
                            "documentReferenceValue": "401f423b25b649a73b7b64f232d9a33efcdd1a788e0992edfd8c48449f927dce"
                        }],
                        "references": [{"referenceType": "EQ", "referenceValue": "APZU3856920"}, {
                            "referenceType": "EQ",
                            "referenceValue": "APZU3936760"
                        }, {"referenceType": "EQ", "referenceValue": "CAIU3707093"}, {
                            "referenceType": "EQ",
                            "referenceValue": "CMAU0323116"
                        }, {"referenceType": "EQ", "referenceValue": "CMAU0875630"}, {
                            "referenceType": "EQ",
                            "referenceValue": "MAGU2239792"
                        }, {"referenceType": "EQ", "referenceValue": "TCLU7252194"}, {
                            "referenceType": "EQ",
                            "referenceValue": "TEMU0227469"
                        }, {"referenceType": "EQ", "referenceValue": "TEMU3240783"}, {
                            "referenceType": "EQ",
                            "referenceValue": "TLLU2806305"
                        }, {"referenceType": "EQ", "referenceValue": "TRHU3662231"}, {
                            "referenceType": "EQ",
                            "referenceValue": "TRLU9614964"
                        }],
                        "equipmentReference": "MAGU2239792"
                    }, {
                        "eventID": "91c2c128b8913862789f84fc9674abe5064d09f7",
                        "eventCreatedDateTime": "2023-06-13T02:33:07+00:00",
                        "eventType": "TRANSPORT",
                        "eventClassifierCode": "PLN",
                        "eventDateTime": "2023-06-11T06:27:00-07:00",
                        "carrierSpecificData": {
                            "internalEventCode": "PVD",
                            "internalEventLabel": "Vessel Departure",
                            "internalLocationCode": "USLAX",
                            "internalFacilityCode": "USLAXMETS",
                            "bookingExportVoyageReference": "0FTHSN1MA",
                            "transportationPhase": "Export",
                            "shipmentLocationType": "POL",
                            "transportCallSequenceTotal": 2,
                            "numberOfUnits": 12
                        },
                        "transportEventTypeCode": "DEPA",
                        "transportCall": {
                            "transportCallID": "50002856834",
                            "exportVoyageNumber": "0FTHSN1MA",
                            "transportCallSequenceNumber": 1,
                            "facilityCode": "ETS",
                            "facilityCodeListProvider": "SMDG",
                            "modeOfTransport": "VESSEL",
                            "location": {
                                "locationName": "LOS ANGELES, CA",
                                "latitude": "34.05222",
                                "longitude": "-118.24278",
                                "address": {
                                    "name": "389 TERMINAL ISLAND WAY",
                                    "street": "BERTHS 226-236",
                                    "postCode": "90731",
                                    "city": "LOS ANGELES",
                                    "country": "UNITED STATES"
                                }
                            },
                            "vessel": {
                                "vesselIMONumber": "9850848",
                                "vesselName": "EVER FOND",
                                "vesselFlag": "LR",
                                "vesselCallSignNumber": "5LCS5",
                                "vesselOperatorCarrierCode": "EMC"
                            }
                        },
                        "documentReferences": [{
                            "documentReferenceType": "BKG",
                            "documentReferenceValue": "401f423b25b649a73b7b64f232d9a33efcdd1a788e0992edfd8c48449f927dce"
                        }],
                        "references": [{"referenceType": "EQ", "referenceValue": "APZU3856920"}, {
                            "referenceType": "EQ",
                            "referenceValue": "APZU3936760"
                        }, {"referenceType": "EQ", "referenceValue": "CAIU3707093"}, {
                            "referenceType": "EQ",
                            "referenceValue": "CMAU0323116"
                        }, {"referenceType": "EQ", "referenceValue": "CMAU0875630"}, {
                            "referenceType": "EQ",
                            "referenceValue": "MAGU2239792"
                        }, {"referenceType": "EQ", "referenceValue": "TCLU7252194"}, {
                            "referenceType": "EQ",
                            "referenceValue": "TEMU0227469"
                        }, {"referenceType": "EQ", "referenceValue": "TEMU3240783"}, {
                            "referenceType": "EQ",
                            "referenceValue": "TLLU2806305"
                        }, {"referenceType": "EQ", "referenceValue": "TRHU3662231"}, {
                            "referenceType": "EQ",
                            "referenceValue": "TRLU9614964"
                        }],
                        "equipmentReference": "MAGU2239792"
                    }, {
                        "eventID": "93be2a319f6bb52aa06bbcd65827c340674e488b",
                        "eventCreatedDateTime": "2023-06-11T03:04:05+00:00",
                        "eventType": "TRANSPORT",
                        "eventClassifierCode": "ACT",
                        "eventDateTime": "2023-06-10T19:00:00-07:00",
                        "carrierSpecificData": {
                            "internalEventCode": "AVD",
                            "internalEventLabel": "Vessel Departure",
                            "internalLocationCode": "USLAX",
                            "internalFacilityCode": "USLAXMETS",
                            "bookingExportVoyageReference": "0FTHSN1MA",
                            "transportationPhase": "Export",
                            "shipmentLocationType": "POL",
                            "transportCallSequenceTotal": 2,
                            "numberOfUnits": 12
                        },
                        "transportEventTypeCode": "DEPA",
                        "transportCall": {
                            "transportCallID": "50002856834",
                            "exportVoyageNumber": "0FTHSN1MA",
                            "transportCallSequenceNumber": 1,
                            "facilityCode": "ETS",
                            "facilityCodeListProvider": "SMDG",
                            "modeOfTransport": "VESSEL",
                            "location": {
                                "locationName": "LOS ANGELES, CA",
                                "latitude": "34.05222",
                                "longitude": "-118.24278",
                                "address": {
                                    "name": "389 TERMINAL ISLAND WAY",
                                    "street": "BERTHS 226-236",
                                    "postCode": "90731",
                                    "city": "LOS ANGELES",
                                    "country": "UNITED STATES"
                                }
                            },
                            "vessel": {
                                "vesselIMONumber": "9850848",
                                "vesselName": "EVER FOND",
                                "vesselFlag": "LR",
                                "vesselCallSignNumber": "5LCS5",
                                "vesselOperatorCarrierCode": "EMC"
                            }
                        },
                        "documentReferences": [{
                            "documentReferenceType": "BKG",
                            "documentReferenceValue": "401f423b25b649a73b7b64f232d9a33efcdd1a788e0992edfd8c48449f927dce"
                        }],
                        "references": [{"referenceType": "EQ", "referenceValue": "APZU3856920"}, {
                            "referenceType": "EQ",
                            "referenceValue": "APZU3936760"
                        }, {"referenceType": "EQ", "referenceValue": "CAIU3707093"}, {
                            "referenceType": "EQ",
                            "referenceValue": "CMAU0323116"
                        }, {"referenceType": "EQ", "referenceValue": "CMAU0875630"}, {
                            "referenceType": "EQ",
                            "referenceValue": "MAGU2239792"
                        }, {"referenceType": "EQ", "referenceValue": "TCLU7252194"}, {
                            "referenceType": "EQ",
                            "referenceValue": "TEMU0227469"
                        }, {"referenceType": "EQ", "referenceValue": "TEMU3240783"}, {
                            "referenceType": "EQ",
                            "referenceValue": "TLLU2806305"
                        }, {"referenceType": "EQ", "referenceValue": "TRHU3662231"}, {
                            "referenceType": "EQ",
                            "referenceValue": "TRLU9614964"
                        }],
                        "equipmentReference": "MAGU2239792"
                    }, {
                        "eventID": "f5f848998f46aa4fc657c98318ae928ef7f3181a",
                        "eventCreatedDateTime": "2023-06-11T05:40:14+00:00",
                        "eventType": "EQUIPMENT",
                        "eventClassifierCode": "ACT",
                        "eventDateTime": "2023-06-10T13:55:00-07:00",
                        "carrierSpecificData": {
                            "internalEventCode": "XOF",
                            "internalEventLabel": "Loaded on board",
                            "internalLocationCode": "USLAX",
                            "internalFacilityCode": "USLAXMETS",
                            "transportationPhase": "Export"
                        },
                        "transportCall": {
                            "transportCallID": "2ed84694-e7be-48ea-89f5-5c0ef3090f5d",
                            "exportVoyageNumber": "0FTHSN1MA",
                            "facilityCode": "ETS",
                            "facilityCodeListProvider": "SMDG",
                            "modeOfTransport": "VESSEL",
                            "location": {
                                "locationName": "LOS ANGELES, CA",
                                "latitude": "34.05222",
                                "longitude": "-118.24278",
                                "address": {
                                    "name": "389 TERMINAL ISLAND WAY",
                                    "street": "BERTHS 226-236",
                                    "postCode": "90731",
                                    "city": "LOS ANGELES",
                                    "country": "UNITED STATES"
                                }
                            },
                            "vessel": {
                                "vesselIMONumber": "9850848",
                                "vesselName": "EVER FOND",
                                "vesselFlag": "LR",
                                "vesselCallSignNumber": "5LCS5",
                                "vesselOperatorCarrierCode": "EMC"
                            }
                        },
                        "documentReferences": [{
                            "documentReferenceType": "BKG",
                            "documentReferenceValue": "401f423b25b649a73b7b64f232d9a33efcdd1a788e0992edfd8c48449f927dce"
                        }],
                        "equipmentEventTypeCode": "LOAD",
                        "equipmentReference": "MAGU2239792",
                        "ISOEquipmentCode": "22G1",
                        "emptyIndicatorCode": "LADEN",
                        "isoequipmentCode": "22G1"
                    }, {
                        "eventID": "bd25db5d947bb17bd01d3370f965bfefb2242228",
                        "eventCreatedDateTime": "2023-05-30T18:48:02+00:00",
                        "eventType": "EQUIPMENT",
                        "eventClassifierCode": "ACT",
                        "eventDateTime": "2023-05-30T11:18:00-07:00",
                        "carrierSpecificData": {
                            "internalEventCode": "XRX",
                            "internalEventLabel": "Gate in at Port terminal",
                            "internalLocationCode": "USLAX",
                            "internalFacilityCode": "USLAXMETS",
                            "transportationPhase": "Export"
                        },
                        "transportCall": {
                            "transportCallID": "c73be824-7e13-41c6-9925-3213608f6ea1",
                            "facilityCode": "ETS",
                            "facilityCodeListProvider": "SMDG",
                            "modeOfTransport": "TRUCK",
                            "location": {
                                "locationName": "LOS ANGELES, CA",
                                "latitude": "34.05222",
                                "longitude": "-118.24278",
                                "address": {
                                    "name": "389 TERMINAL ISLAND WAY",
                                    "street": "BERTHS 226-236",
                                    "postCode": "90731",
                                    "city": "LOS ANGELES",
                                    "country": "UNITED STATES"
                                }
                            }
                        },
                        "documentReferences": [{
                            "documentReferenceType": "BKG",
                            "documentReferenceValue": "401f423b25b649a73b7b64f232d9a33efcdd1a788e0992edfd8c48449f927dce"
                        }],
                        "equipmentEventTypeCode": "GTIN",
                        "equipmentReference": "MAGU2239792",
                        "ISOEquipmentCode": "22G1",
                        "emptyIndicatorCode": "LADEN",
                        "isoequipmentCode": "22G1"
                    }, {
                        "eventID": "bc2c62c5a8e89c405201a72409a6872208ff988b",
                        "eventCreatedDateTime": "2023-05-24T08:34:00+00:00",
                        "eventType": "EQUIPMENT",
                        "eventClassifierCode": "ACT",
                        "eventDateTime": "2023-05-23T23:40:00-07:00",
                        "carrierSpecificData": {
                            "internalEventCode": "MOS",
                            "internalEventLabel": "Empty Picked-up at Depot",
                            "internalLocationCode": "USLAX",
                            "internalFacilityCode": "USLAXSRIO",
                            "transportationPhase": "Export"
                        },
                        "transportCall": {
                            "transportCallID": "fa67e1d1-7527-4260-818d-c4a2a40003f1",
                            "modeOfTransport": "TRUCK",
                            "location": {
                                "locationName": "LOS ANGELES, CA",
                                "latitude": "34.05222",
                                "longitude": "-118.24278",
                                "address": {
                                    "name": "SUCKOW ROAD",
                                    "postCode": "93516",
                                    "city": "LOS ANGELES",
                                    "country": "UNITED STATES"
                                }
                            }
                        },
                        "documentReferences": [{
                            "documentReferenceType": "BKG",
                            "documentReferenceValue": "401f423b25b649a73b7b64f232d9a33efcdd1a788e0992edfd8c48449f927dce"
                        }],
                        "equipmentEventTypeCode": "GTOT",
                        "equipmentReference": "MAGU2239792",
                        "ISOEquipmentCode": "22G1",
                        "emptyIndicatorCode": "EMPTY",
                        "isoequipmentCode": "22G1"
                    }]
                }, {
                    "containerRef": "TLLU2806305", "equipmentSize": "22G1", "movement": [{
                        "eventID": "0e1e55da0ea7439dd7eb66f9988e8fa0f6a6c1a6",
                        "eventCreatedDateTime": "2023-06-13T02:33:07+00:00",
                        "eventType": "TRANSPORT",
                        "eventClassifierCode": "PLN",
                        "eventDateTime": "2023-07-18T04:18:00+08:00",
                        "carrierSpecificData": {
                            "internalEventCode": "PVA",
                            "internalEventLabel": "Vessel Arrival",
                            "internalLocationCode": "CNSHK",
                            "internalFacilityCode": "CNSHKDSCT",
                            "bookingExportVoyageReference": "0FTHSN1MA",
                            "transportationPhase": "Import",
                            "shipmentLocationType": "POD",
                            "transportCallSequenceTotal": 2,
                            "numberOfUnits": 12
                        },
                        "transportEventTypeCode": "ARRI",
                        "transportCall": {
                            "transportCallID": "50002857703",
                            "importVoyageNumber": "0FTHSN1MA",
                            "transportCallSequenceNumber": 2,
                            "facilityCode": "SCT",
                            "facilityCodeListProvider": "SMDG",
                            "modeOfTransport": "VESSEL",
                            "location": {
                                "locationName": "SHEKOU",
                                "latitude": "22.49639",
                                "longitude": "113.92",
                                "address": {
                                    "name": "JETTY THREE, HARBOUR ROAD,",
                                    "street": ".",
                                    "city": "SHEKOU",
                                    "country": "CHINA"
                                }
                            },
                            "vessel": {
                                "vesselIMONumber": "9850848",
                                "vesselName": "EVER FOND",
                                "vesselFlag": "LR",
                                "vesselCallSignNumber": "5LCS5",
                                "vesselOperatorCarrierCode": "EMC"
                            }
                        },
                        "documentReferences": [{
                            "documentReferenceType": "BKG",
                            "documentReferenceValue": "401f423b25b649a73b7b64f232d9a33efcdd1a788e0992edfd8c48449f927dce"
                        }],
                        "references": [{"referenceType": "EQ", "referenceValue": "APZU3856920"}, {
                            "referenceType": "EQ",
                            "referenceValue": "APZU3936760"
                        }, {"referenceType": "EQ", "referenceValue": "CAIU3707093"}, {
                            "referenceType": "EQ",
                            "referenceValue": "CMAU0323116"
                        }, {"referenceType": "EQ", "referenceValue": "CMAU0875630"}, {
                            "referenceType": "EQ",
                            "referenceValue": "MAGU2239792"
                        }, {"referenceType": "EQ", "referenceValue": "TCLU7252194"}, {
                            "referenceType": "EQ",
                            "referenceValue": "TEMU0227469"
                        }, {"referenceType": "EQ", "referenceValue": "TEMU3240783"}, {
                            "referenceType": "EQ",
                            "referenceValue": "TLLU2806305"
                        }, {"referenceType": "EQ", "referenceValue": "TRHU3662231"}, {
                            "referenceType": "EQ",
                            "referenceValue": "TRLU9614964"
                        }],
                        "equipmentReference": "TLLU2806305"
                    }, {
                        "eventID": "91c2c128b8913862789f84fc9674abe5064d09f7",
                        "eventCreatedDateTime": "2023-06-13T02:33:07+00:00",
                        "eventType": "TRANSPORT",
                        "eventClassifierCode": "PLN",
                        "eventDateTime": "2023-06-11T06:27:00-07:00",
                        "carrierSpecificData": {
                            "internalEventCode": "PVD",
                            "internalEventLabel": "Vessel Departure",
                            "internalLocationCode": "USLAX",
                            "internalFacilityCode": "USLAXMETS",
                            "bookingExportVoyageReference": "0FTHSN1MA",
                            "transportationPhase": "Export",
                            "shipmentLocationType": "POL",
                            "transportCallSequenceTotal": 2,
                            "numberOfUnits": 12
                        },
                        "transportEventTypeCode": "DEPA",
                        "transportCall": {
                            "transportCallID": "50002856834",
                            "exportVoyageNumber": "0FTHSN1MA",
                            "transportCallSequenceNumber": 1,
                            "facilityCode": "ETS",
                            "facilityCodeListProvider": "SMDG",
                            "modeOfTransport": "VESSEL",
                            "location": {
                                "locationName": "LOS ANGELES, CA",
                                "latitude": "34.05222",
                                "longitude": "-118.24278",
                                "address": {
                                    "name": "389 TERMINAL ISLAND WAY",
                                    "street": "BERTHS 226-236",
                                    "postCode": "90731",
                                    "city": "LOS ANGELES",
                                    "country": "UNITED STATES"
                                }
                            },
                            "vessel": {
                                "vesselIMONumber": "9850848",
                                "vesselName": "EVER FOND",
                                "vesselFlag": "LR",
                                "vesselCallSignNumber": "5LCS5",
                                "vesselOperatorCarrierCode": "EMC"
                            }
                        },
                        "documentReferences": [{
                            "documentReferenceType": "BKG",
                            "documentReferenceValue": "401f423b25b649a73b7b64f232d9a33efcdd1a788e0992edfd8c48449f927dce"
                        }],
                        "references": [{"referenceType": "EQ", "referenceValue": "APZU3856920"}, {
                            "referenceType": "EQ",
                            "referenceValue": "APZU3936760"
                        }, {"referenceType": "EQ", "referenceValue": "CAIU3707093"}, {
                            "referenceType": "EQ",
                            "referenceValue": "CMAU0323116"
                        }, {"referenceType": "EQ", "referenceValue": "CMAU0875630"}, {
                            "referenceType": "EQ",
                            "referenceValue": "MAGU2239792"
                        }, {"referenceType": "EQ", "referenceValue": "TCLU7252194"}, {
                            "referenceType": "EQ",
                            "referenceValue": "TEMU0227469"
                        }, {"referenceType": "EQ", "referenceValue": "TEMU3240783"}, {
                            "referenceType": "EQ",
                            "referenceValue": "TLLU2806305"
                        }, {"referenceType": "EQ", "referenceValue": "TRHU3662231"}, {
                            "referenceType": "EQ",
                            "referenceValue": "TRLU9614964"
                        }],
                        "equipmentReference": "TLLU2806305"
                    }, {
                        "eventID": "93be2a319f6bb52aa06bbcd65827c340674e488b",
                        "eventCreatedDateTime": "2023-06-11T03:04:05+00:00",
                        "eventType": "TRANSPORT",
                        "eventClassifierCode": "ACT",
                        "eventDateTime": "2023-06-10T19:00:00-07:00",
                        "carrierSpecificData": {
                            "internalEventCode": "AVD",
                            "internalEventLabel": "Vessel Departure",
                            "internalLocationCode": "USLAX",
                            "internalFacilityCode": "USLAXMETS",
                            "bookingExportVoyageReference": "0FTHSN1MA",
                            "transportationPhase": "Export",
                            "shipmentLocationType": "POL",
                            "transportCallSequenceTotal": 2,
                            "numberOfUnits": 12
                        },
                        "transportEventTypeCode": "DEPA",
                        "transportCall": {
                            "transportCallID": "50002856834",
                            "exportVoyageNumber": "0FTHSN1MA",
                            "transportCallSequenceNumber": 1,
                            "facilityCode": "ETS",
                            "facilityCodeListProvider": "SMDG",
                            "modeOfTransport": "VESSEL",
                            "location": {
                                "locationName": "LOS ANGELES, CA",
                                "latitude": "34.05222",
                                "longitude": "-118.24278",
                                "address": {
                                    "name": "389 TERMINAL ISLAND WAY",
                                    "street": "BERTHS 226-236",
                                    "postCode": "90731",
                                    "city": "LOS ANGELES",
                                    "country": "UNITED STATES"
                                }
                            },
                            "vessel": {
                                "vesselIMONumber": "9850848",
                                "vesselName": "EVER FOND",
                                "vesselFlag": "LR",
                                "vesselCallSignNumber": "5LCS5",
                                "vesselOperatorCarrierCode": "EMC"
                            }
                        },
                        "documentReferences": [{
                            "documentReferenceType": "BKG",
                            "documentReferenceValue": "401f423b25b649a73b7b64f232d9a33efcdd1a788e0992edfd8c48449f927dce"
                        }],
                        "references": [{"referenceType": "EQ", "referenceValue": "APZU3856920"}, {
                            "referenceType": "EQ",
                            "referenceValue": "APZU3936760"
                        }, {"referenceType": "EQ", "referenceValue": "CAIU3707093"}, {
                            "referenceType": "EQ",
                            "referenceValue": "CMAU0323116"
                        }, {"referenceType": "EQ", "referenceValue": "CMAU0875630"}, {
                            "referenceType": "EQ",
                            "referenceValue": "MAGU2239792"
                        }, {"referenceType": "EQ", "referenceValue": "TCLU7252194"}, {
                            "referenceType": "EQ",
                            "referenceValue": "TEMU0227469"
                        }, {"referenceType": "EQ", "referenceValue": "TEMU3240783"}, {
                            "referenceType": "EQ",
                            "referenceValue": "TLLU2806305"
                        }, {"referenceType": "EQ", "referenceValue": "TRHU3662231"}, {
                            "referenceType": "EQ",
                            "referenceValue": "TRLU9614964"
                        }],
                        "equipmentReference": "TLLU2806305"
                    }, {
                        "eventID": "131897e268a3cad901ea9a1ab36a7a602d25220a",
                        "eventCreatedDateTime": "2023-06-11T05:41:32+00:00",
                        "eventType": "EQUIPMENT",
                        "eventClassifierCode": "ACT",
                        "eventDateTime": "2023-06-10T13:43:00-07:00",
                        "carrierSpecificData": {
                            "internalEventCode": "XOF",
                            "internalEventLabel": "Loaded on board",
                            "internalLocationCode": "USLAX",
                            "internalFacilityCode": "USLAXMETS",
                            "transportationPhase": "Export"
                        },
                        "transportCall": {
                            "transportCallID": "f577ca07-b2ad-493e-a886-abae3af20e73",
                            "exportVoyageNumber": "0FTHSN1MA",
                            "facilityCode": "ETS",
                            "facilityCodeListProvider": "SMDG",
                            "modeOfTransport": "VESSEL",
                            "location": {
                                "locationName": "LOS ANGELES, CA",
                                "latitude": "34.05222",
                                "longitude": "-118.24278",
                                "address": {
                                    "name": "389 TERMINAL ISLAND WAY",
                                    "street": "BERTHS 226-236",
                                    "postCode": "90731",
                                    "city": "LOS ANGELES",
                                    "country": "UNITED STATES"
                                }
                            },
                            "vessel": {
                                "vesselIMONumber": "9850848",
                                "vesselName": "EVER FOND",
                                "vesselFlag": "LR",
                                "vesselCallSignNumber": "5LCS5",
                                "vesselOperatorCarrierCode": "EMC"
                            }
                        },
                        "documentReferences": [{
                            "documentReferenceType": "BKG",
                            "documentReferenceValue": "401f423b25b649a73b7b64f232d9a33efcdd1a788e0992edfd8c48449f927dce"
                        }],
                        "equipmentEventTypeCode": "LOAD",
                        "equipmentReference": "TLLU2806305",
                        "ISOEquipmentCode": "22G1",
                        "emptyIndicatorCode": "LADEN",
                        "isoequipmentCode": "22G1"
                    }, {
                        "eventID": "9babe245b453e4a37a44c065be3e5103c0a1048f",
                        "eventCreatedDateTime": "2023-05-30T14:48:30+00:00",
                        "eventType": "EQUIPMENT",
                        "eventClassifierCode": "ACT",
                        "eventDateTime": "2023-05-30T07:17:00-07:00",
                        "carrierSpecificData": {
                            "internalEventCode": "XRX",
                            "internalEventLabel": "Gate in at Port terminal",
                            "internalLocationCode": "USLAX",
                            "internalFacilityCode": "USLAXMETS",
                            "transportationPhase": "Export"
                        },
                        "transportCall": {
                            "transportCallID": "1e74ec55-fbfd-405a-91ce-59463d3b6332",
                            "facilityCode": "ETS",
                            "facilityCodeListProvider": "SMDG",
                            "modeOfTransport": "TRUCK",
                            "location": {
                                "locationName": "LOS ANGELES, CA",
                                "latitude": "34.05222",
                                "longitude": "-118.24278",
                                "address": {
                                    "name": "389 TERMINAL ISLAND WAY",
                                    "street": "BERTHS 226-236",
                                    "postCode": "90731",
                                    "city": "LOS ANGELES",
                                    "country": "UNITED STATES"
                                }
                            }
                        },
                        "documentReferences": [{
                            "documentReferenceType": "BKG",
                            "documentReferenceValue": "401f423b25b649a73b7b64f232d9a33efcdd1a788e0992edfd8c48449f927dce"
                        }],
                        "equipmentEventTypeCode": "GTIN",
                        "equipmentReference": "TLLU2806305",
                        "ISOEquipmentCode": "22G1",
                        "emptyIndicatorCode": "LADEN",
                        "isoequipmentCode": "22G1"
                    }, {
                        "eventID": "b202abcfa8d73c38c2b6186c9d3531193e5e737d",
                        "eventCreatedDateTime": "2023-05-16T23:18:17+00:00",
                        "eventType": "EQUIPMENT",
                        "eventClassifierCode": "ACT",
                        "eventDateTime": "2023-05-16T16:08:00-07:00",
                        "carrierSpecificData": {
                            "internalEventCode": "MOS",
                            "internalEventLabel": "Empty Picked-up at Depot",
                            "internalLocationCode": "USLAX",
                            "internalFacilityCode": "USLAXSRIO",
                            "transportationPhase": "Export"
                        },
                        "transportCall": {
                            "transportCallID": "1644e515-da71-46dd-8cd5-0ae1b9f22735",
                            "modeOfTransport": "TRUCK",
                            "location": {
                                "locationName": "LOS ANGELES, CA",
                                "latitude": "34.05222",
                                "longitude": "-118.24278",
                                "address": {
                                    "name": "SUCKOW ROAD",
                                    "postCode": "93516",
                                    "city": "LOS ANGELES",
                                    "country": "UNITED STATES"
                                }
                            }
                        },
                        "documentReferences": [{
                            "documentReferenceType": "BKG",
                            "documentReferenceValue": "401f423b25b649a73b7b64f232d9a33efcdd1a788e0992edfd8c48449f927dce"
                        }],
                        "equipmentEventTypeCode": "GTOT",
                        "equipmentReference": "TLLU2806305",
                        "ISOEquipmentCode": "22G1",
                        "emptyIndicatorCode": "EMPTY",
                        "isoequipmentCode": "22G1"
                    }]
                }, {
                    "containerRef": "CAIU3707093", "equipmentSize": "22G0", "movement": [{
                        "eventID": "0e1e55da0ea7439dd7eb66f9988e8fa0f6a6c1a6",
                        "eventCreatedDateTime": "2023-06-13T02:33:07+00:00",
                        "eventType": "TRANSPORT",
                        "eventClassifierCode": "PLN",
                        "eventDateTime": "2023-07-18T04:18:00+08:00",
                        "carrierSpecificData": {
                            "internalEventCode": "PVA",
                            "internalEventLabel": "Vessel Arrival",
                            "internalLocationCode": "CNSHK",
                            "internalFacilityCode": "CNSHKDSCT",
                            "bookingExportVoyageReference": "0FTHSN1MA",
                            "transportationPhase": "Import",
                            "shipmentLocationType": "POD",
                            "transportCallSequenceTotal": 2,
                            "numberOfUnits": 12
                        },
                        "transportEventTypeCode": "ARRI",
                        "transportCall": {
                            "transportCallID": "50002857703",
                            "importVoyageNumber": "0FTHSN1MA",
                            "transportCallSequenceNumber": 2,
                            "facilityCode": "SCT",
                            "facilityCodeListProvider": "SMDG",
                            "modeOfTransport": "VESSEL",
                            "location": {
                                "locationName": "SHEKOU",
                                "latitude": "22.49639",
                                "longitude": "113.92",
                                "address": {
                                    "name": "JETTY THREE, HARBOUR ROAD,",
                                    "street": ".",
                                    "city": "SHEKOU",
                                    "country": "CHINA"
                                }
                            },
                            "vessel": {
                                "vesselIMONumber": "9850848",
                                "vesselName": "EVER FOND",
                                "vesselFlag": "LR",
                                "vesselCallSignNumber": "5LCS5",
                                "vesselOperatorCarrierCode": "EMC"
                            }
                        },
                        "documentReferences": [{
                            "documentReferenceType": "BKG",
                            "documentReferenceValue": "401f423b25b649a73b7b64f232d9a33efcdd1a788e0992edfd8c48449f927dce"
                        }],
                        "references": [{"referenceType": "EQ", "referenceValue": "APZU3856920"}, {
                            "referenceType": "EQ",
                            "referenceValue": "APZU3936760"
                        }, {"referenceType": "EQ", "referenceValue": "CAIU3707093"}, {
                            "referenceType": "EQ",
                            "referenceValue": "CMAU0323116"
                        }, {"referenceType": "EQ", "referenceValue": "CMAU0875630"}, {
                            "referenceType": "EQ",
                            "referenceValue": "MAGU2239792"
                        }, {"referenceType": "EQ", "referenceValue": "TCLU7252194"}, {
                            "referenceType": "EQ",
                            "referenceValue": "TEMU0227469"
                        }, {"referenceType": "EQ", "referenceValue": "TEMU3240783"}, {
                            "referenceType": "EQ",
                            "referenceValue": "TLLU2806305"
                        }, {"referenceType": "EQ", "referenceValue": "TRHU3662231"}, {
                            "referenceType": "EQ",
                            "referenceValue": "TRLU9614964"
                        }],
                        "equipmentReference": "CAIU3707093"
                    }, {
                        "eventID": "91c2c128b8913862789f84fc9674abe5064d09f7",
                        "eventCreatedDateTime": "2023-06-13T02:33:07+00:00",
                        "eventType": "TRANSPORT",
                        "eventClassifierCode": "PLN",
                        "eventDateTime": "2023-06-11T06:27:00-07:00",
                        "carrierSpecificData": {
                            "internalEventCode": "PVD",
                            "internalEventLabel": "Vessel Departure",
                            "internalLocationCode": "USLAX",
                            "internalFacilityCode": "USLAXMETS",
                            "bookingExportVoyageReference": "0FTHSN1MA",
                            "transportationPhase": "Export",
                            "shipmentLocationType": "POL",
                            "transportCallSequenceTotal": 2,
                            "numberOfUnits": 12
                        },
                        "transportEventTypeCode": "DEPA",
                        "transportCall": {
                            "transportCallID": "50002856834",
                            "exportVoyageNumber": "0FTHSN1MA",
                            "transportCallSequenceNumber": 1,
                            "facilityCode": "ETS",
                            "facilityCodeListProvider": "SMDG",
                            "modeOfTransport": "VESSEL",
                            "location": {
                                "locationName": "LOS ANGELES, CA",
                                "latitude": "34.05222",
                                "longitude": "-118.24278",
                                "address": {
                                    "name": "389 TERMINAL ISLAND WAY",
                                    "street": "BERTHS 226-236",
                                    "postCode": "90731",
                                    "city": "LOS ANGELES",
                                    "country": "UNITED STATES"
                                }
                            },
                            "vessel": {
                                "vesselIMONumber": "9850848",
                                "vesselName": "EVER FOND",
                                "vesselFlag": "LR",
                                "vesselCallSignNumber": "5LCS5",
                                "vesselOperatorCarrierCode": "EMC"
                            }
                        },
                        "documentReferences": [{
                            "documentReferenceType": "BKG",
                            "documentReferenceValue": "401f423b25b649a73b7b64f232d9a33efcdd1a788e0992edfd8c48449f927dce"
                        }],
                        "references": [{"referenceType": "EQ", "referenceValue": "APZU3856920"}, {
                            "referenceType": "EQ",
                            "referenceValue": "APZU3936760"
                        }, {"referenceType": "EQ", "referenceValue": "CAIU3707093"}, {
                            "referenceType": "EQ",
                            "referenceValue": "CMAU0323116"
                        }, {"referenceType": "EQ", "referenceValue": "CMAU0875630"}, {
                            "referenceType": "EQ",
                            "referenceValue": "MAGU2239792"
                        }, {"referenceType": "EQ", "referenceValue": "TCLU7252194"}, {
                            "referenceType": "EQ",
                            "referenceValue": "TEMU0227469"
                        }, {"referenceType": "EQ", "referenceValue": "TEMU3240783"}, {
                            "referenceType": "EQ",
                            "referenceValue": "TLLU2806305"
                        }, {"referenceType": "EQ", "referenceValue": "TRHU3662231"}, {
                            "referenceType": "EQ",
                            "referenceValue": "TRLU9614964"
                        }],
                        "equipmentReference": "CAIU3707093"
                    }, {
                        "eventID": "93be2a319f6bb52aa06bbcd65827c340674e488b",
                        "eventCreatedDateTime": "2023-06-11T03:04:05+00:00",
                        "eventType": "TRANSPORT",
                        "eventClassifierCode": "ACT",
                        "eventDateTime": "2023-06-10T19:00:00-07:00",
                        "carrierSpecificData": {
                            "internalEventCode": "AVD",
                            "internalEventLabel": "Vessel Departure",
                            "internalLocationCode": "USLAX",
                            "internalFacilityCode": "USLAXMETS",
                            "bookingExportVoyageReference": "0FTHSN1MA",
                            "transportationPhase": "Export",
                            "shipmentLocationType": "POL",
                            "transportCallSequenceTotal": 2,
                            "numberOfUnits": 12
                        },
                        "transportEventTypeCode": "DEPA",
                        "transportCall": {
                            "transportCallID": "50002856834",
                            "exportVoyageNumber": "0FTHSN1MA",
                            "transportCallSequenceNumber": 1,
                            "facilityCode": "ETS",
                            "facilityCodeListProvider": "SMDG",
                            "modeOfTransport": "VESSEL",
                            "location": {
                                "locationName": "LOS ANGELES, CA",
                                "latitude": "34.05222",
                                "longitude": "-118.24278",
                                "address": {
                                    "name": "389 TERMINAL ISLAND WAY",
                                    "street": "BERTHS 226-236",
                                    "postCode": "90731",
                                    "city": "LOS ANGELES",
                                    "country": "UNITED STATES"
                                }
                            },
                            "vessel": {
                                "vesselIMONumber": "9850848",
                                "vesselName": "EVER FOND",
                                "vesselFlag": "LR",
                                "vesselCallSignNumber": "5LCS5",
                                "vesselOperatorCarrierCode": "EMC"
                            }
                        },
                        "documentReferences": [{
                            "documentReferenceType": "BKG",
                            "documentReferenceValue": "401f423b25b649a73b7b64f232d9a33efcdd1a788e0992edfd8c48449f927dce"
                        }],
                        "references": [{"referenceType": "EQ", "referenceValue": "APZU3856920"}, {
                            "referenceType": "EQ",
                            "referenceValue": "APZU3936760"
                        }, {"referenceType": "EQ", "referenceValue": "CAIU3707093"}, {
                            "referenceType": "EQ",
                            "referenceValue": "CMAU0323116"
                        }, {"referenceType": "EQ", "referenceValue": "CMAU0875630"}, {
                            "referenceType": "EQ",
                            "referenceValue": "MAGU2239792"
                        }, {"referenceType": "EQ", "referenceValue": "TCLU7252194"}, {
                            "referenceType": "EQ",
                            "referenceValue": "TEMU0227469"
                        }, {"referenceType": "EQ", "referenceValue": "TEMU3240783"}, {
                            "referenceType": "EQ",
                            "referenceValue": "TLLU2806305"
                        }, {"referenceType": "EQ", "referenceValue": "TRHU3662231"}, {
                            "referenceType": "EQ",
                            "referenceValue": "TRLU9614964"
                        }],
                        "equipmentReference": "CAIU3707093"
                    }, {
                        "eventID": "c4e199d187dc8ffcb9ef76f714adafbf9fc4daf3",
                        "eventCreatedDateTime": "2023-06-11T05:39:49+00:00",
                        "eventType": "EQUIPMENT",
                        "eventClassifierCode": "ACT",
                        "eventDateTime": "2023-06-10T13:52:00-07:00",
                        "carrierSpecificData": {
                            "internalEventCode": "XOF",
                            "internalEventLabel": "Loaded on board",
                            "internalLocationCode": "USLAX",
                            "internalFacilityCode": "USLAXMETS",
                            "transportationPhase": "Export"
                        },
                        "transportCall": {
                            "transportCallID": "385a45be-23a6-4b0d-9e60-1ae5a1e0c042",
                            "exportVoyageNumber": "0FTHSN1MA",
                            "facilityCode": "ETS",
                            "facilityCodeListProvider": "SMDG",
                            "modeOfTransport": "VESSEL",
                            "location": {
                                "locationName": "LOS ANGELES, CA",
                                "latitude": "34.05222",
                                "longitude": "-118.24278",
                                "address": {
                                    "name": "389 TERMINAL ISLAND WAY",
                                    "street": "BERTHS 226-236",
                                    "postCode": "90731",
                                    "city": "LOS ANGELES",
                                    "country": "UNITED STATES"
                                }
                            },
                            "vessel": {
                                "vesselIMONumber": "9850848",
                                "vesselName": "EVER FOND",
                                "vesselFlag": "LR",
                                "vesselCallSignNumber": "5LCS5",
                                "vesselOperatorCarrierCode": "EMC"
                            }
                        },
                        "documentReferences": [{
                            "documentReferenceType": "BKG",
                            "documentReferenceValue": "401f423b25b649a73b7b64f232d9a33efcdd1a788e0992edfd8c48449f927dce"
                        }],
                        "equipmentEventTypeCode": "LOAD",
                        "equipmentReference": "CAIU3707093",
                        "ISOEquipmentCode": "22G0",
                        "emptyIndicatorCode": "LADEN",
                        "isoequipmentCode": "22G0"
                    }, {
                        "eventID": "db1b074f5582fbfeadf62e5f742ffdd513efa3c0",
                        "eventCreatedDateTime": "2023-05-30T20:09:25+00:00",
                        "eventType": "EQUIPMENT",
                        "eventClassifierCode": "ACT",
                        "eventDateTime": "2023-05-30T12:41:00-07:00",
                        "carrierSpecificData": {
                            "internalEventCode": "XRX",
                            "internalEventLabel": "Gate in at Port terminal",
                            "internalLocationCode": "USLAX",
                            "internalFacilityCode": "USLAXMETS",
                            "transportationPhase": "Export"
                        },
                        "transportCall": {
                            "transportCallID": "b67c0dae-8175-420a-bbcd-4c5484fd7cbe",
                            "facilityCode": "ETS",
                            "facilityCodeListProvider": "SMDG",
                            "modeOfTransport": "TRUCK",
                            "location": {
                                "locationName": "LOS ANGELES, CA",
                                "latitude": "34.05222",
                                "longitude": "-118.24278",
                                "address": {
                                    "name": "389 TERMINAL ISLAND WAY",
                                    "street": "BERTHS 226-236",
                                    "postCode": "90731",
                                    "city": "LOS ANGELES",
                                    "country": "UNITED STATES"
                                }
                            }
                        },
                        "documentReferences": [{
                            "documentReferenceType": "BKG",
                            "documentReferenceValue": "401f423b25b649a73b7b64f232d9a33efcdd1a788e0992edfd8c48449f927dce"
                        }],
                        "equipmentEventTypeCode": "GTIN",
                        "equipmentReference": "CAIU3707093",
                        "ISOEquipmentCode": "22G0",
                        "emptyIndicatorCode": "LADEN",
                        "isoequipmentCode": "22G0"
                    }, {
                        "eventID": "711822eccd8a714449446f9119968ebc1105fbf9",
                        "eventCreatedDateTime": "2023-05-25T08:51:52+00:00",
                        "eventType": "EQUIPMENT",
                        "eventClassifierCode": "ACT",
                        "eventDateTime": "2023-05-25T01:37:00-07:00",
                        "carrierSpecificData": {
                            "internalEventCode": "MOS",
                            "internalEventLabel": "Empty Picked-up at Depot",
                            "internalLocationCode": "USLAX",
                            "internalFacilityCode": "USLAXSRIO",
                            "transportationPhase": "Export"
                        },
                        "transportCall": {
                            "transportCallID": "76e57484-0882-4716-9811-f76c4e66eec7",
                            "modeOfTransport": "TRUCK",
                            "location": {
                                "locationName": "LOS ANGELES, CA",
                                "latitude": "34.05222",
                                "longitude": "-118.24278",
                                "address": {
                                    "name": "SUCKOW ROAD",
                                    "postCode": "93516",
                                    "city": "LOS ANGELES",
                                    "country": "UNITED STATES"
                                }
                            }
                        },
                        "documentReferences": [{
                            "documentReferenceType": "BKG",
                            "documentReferenceValue": "401f423b25b649a73b7b64f232d9a33efcdd1a788e0992edfd8c48449f927dce"
                        }],
                        "equipmentEventTypeCode": "GTOT",
                        "equipmentReference": "CAIU3707093",
                        "ISOEquipmentCode": "22G0",
                        "emptyIndicatorCode": "EMPTY",
                        "isoequipmentCode": "22G0"
                    }]
                }, {
                    "containerRef": "TEMU3240783", "equipmentSize": "22G1", "movement": [{
                        "eventID": "0e1e55da0ea7439dd7eb66f9988e8fa0f6a6c1a6",
                        "eventCreatedDateTime": "2023-06-13T02:33:07+00:00",
                        "eventType": "TRANSPORT",
                        "eventClassifierCode": "PLN",
                        "eventDateTime": "2023-07-18T04:18:00+08:00",
                        "carrierSpecificData": {
                            "internalEventCode": "PVA",
                            "internalEventLabel": "Vessel Arrival",
                            "internalLocationCode": "CNSHK",
                            "internalFacilityCode": "CNSHKDSCT",
                            "bookingExportVoyageReference": "0FTHSN1MA",
                            "transportationPhase": "Import",
                            "shipmentLocationType": "POD",
                            "transportCallSequenceTotal": 2,
                            "numberOfUnits": 12
                        },
                        "transportEventTypeCode": "ARRI",
                        "transportCall": {
                            "transportCallID": "50002857703",
                            "importVoyageNumber": "0FTHSN1MA",
                            "transportCallSequenceNumber": 2,
                            "facilityCode": "SCT",
                            "facilityCodeListProvider": "SMDG",
                            "modeOfTransport": "VESSEL",
                            "location": {
                                "locationName": "SHEKOU",
                                "latitude": "22.49639",
                                "longitude": "113.92",
                                "address": {
                                    "name": "JETTY THREE, HARBOUR ROAD,",
                                    "street": ".",
                                    "city": "SHEKOU",
                                    "country": "CHINA"
                                }
                            },
                            "vessel": {
                                "vesselIMONumber": "9850848",
                                "vesselName": "EVER FOND",
                                "vesselFlag": "LR",
                                "vesselCallSignNumber": "5LCS5",
                                "vesselOperatorCarrierCode": "EMC"
                            }
                        },
                        "documentReferences": [{
                            "documentReferenceType": "BKG",
                            "documentReferenceValue": "401f423b25b649a73b7b64f232d9a33efcdd1a788e0992edfd8c48449f927dce"
                        }],
                        "references": [{"referenceType": "EQ", "referenceValue": "APZU3856920"}, {
                            "referenceType": "EQ",
                            "referenceValue": "APZU3936760"
                        }, {"referenceType": "EQ", "referenceValue": "CAIU3707093"}, {
                            "referenceType": "EQ",
                            "referenceValue": "CMAU0323116"
                        }, {"referenceType": "EQ", "referenceValue": "CMAU0875630"}, {
                            "referenceType": "EQ",
                            "referenceValue": "MAGU2239792"
                        }, {"referenceType": "EQ", "referenceValue": "TCLU7252194"}, {
                            "referenceType": "EQ",
                            "referenceValue": "TEMU0227469"
                        }, {"referenceType": "EQ", "referenceValue": "TEMU3240783"}, {
                            "referenceType": "EQ",
                            "referenceValue": "TLLU2806305"
                        }, {"referenceType": "EQ", "referenceValue": "TRHU3662231"}, {
                            "referenceType": "EQ",
                            "referenceValue": "TRLU9614964"
                        }],
                        "equipmentReference": "TEMU3240783"
                    }, {
                        "eventID": "91c2c128b8913862789f84fc9674abe5064d09f7",
                        "eventCreatedDateTime": "2023-06-13T02:33:07+00:00",
                        "eventType": "TRANSPORT",
                        "eventClassifierCode": "PLN",
                        "eventDateTime": "2023-06-11T06:27:00-07:00",
                        "carrierSpecificData": {
                            "internalEventCode": "PVD",
                            "internalEventLabel": "Vessel Departure",
                            "internalLocationCode": "USLAX",
                            "internalFacilityCode": "USLAXMETS",
                            "bookingExportVoyageReference": "0FTHSN1MA",
                            "transportationPhase": "Export",
                            "shipmentLocationType": "POL",
                            "transportCallSequenceTotal": 2,
                            "numberOfUnits": 12
                        },
                        "transportEventTypeCode": "DEPA",
                        "transportCall": {
                            "transportCallID": "50002856834",
                            "exportVoyageNumber": "0FTHSN1MA",
                            "transportCallSequenceNumber": 1,
                            "facilityCode": "ETS",
                            "facilityCodeListProvider": "SMDG",
                            "modeOfTransport": "VESSEL",
                            "location": {
                                "locationName": "LOS ANGELES, CA",
                                "latitude": "34.05222",
                                "longitude": "-118.24278",
                                "address": {
                                    "name": "389 TERMINAL ISLAND WAY",
                                    "street": "BERTHS 226-236",
                                    "postCode": "90731",
                                    "city": "LOS ANGELES",
                                    "country": "UNITED STATES"
                                }
                            },
                            "vessel": {
                                "vesselIMONumber": "9850848",
                                "vesselName": "EVER FOND",
                                "vesselFlag": "LR",
                                "vesselCallSignNumber": "5LCS5",
                                "vesselOperatorCarrierCode": "EMC"
                            }
                        },
                        "documentReferences": [{
                            "documentReferenceType": "BKG",
                            "documentReferenceValue": "401f423b25b649a73b7b64f232d9a33efcdd1a788e0992edfd8c48449f927dce"
                        }],
                        "references": [{"referenceType": "EQ", "referenceValue": "APZU3856920"}, {
                            "referenceType": "EQ",
                            "referenceValue": "APZU3936760"
                        }, {"referenceType": "EQ", "referenceValue": "CAIU3707093"}, {
                            "referenceType": "EQ",
                            "referenceValue": "CMAU0323116"
                        }, {"referenceType": "EQ", "referenceValue": "CMAU0875630"}, {
                            "referenceType": "EQ",
                            "referenceValue": "MAGU2239792"
                        }, {"referenceType": "EQ", "referenceValue": "TCLU7252194"}, {
                            "referenceType": "EQ",
                            "referenceValue": "TEMU0227469"
                        }, {"referenceType": "EQ", "referenceValue": "TEMU3240783"}, {
                            "referenceType": "EQ",
                            "referenceValue": "TLLU2806305"
                        }, {"referenceType": "EQ", "referenceValue": "TRHU3662231"}, {
                            "referenceType": "EQ",
                            "referenceValue": "TRLU9614964"
                        }],
                        "equipmentReference": "TEMU3240783"
                    }, {
                        "eventID": "93be2a319f6bb52aa06bbcd65827c340674e488b",
                        "eventCreatedDateTime": "2023-06-11T03:04:05+00:00",
                        "eventType": "TRANSPORT",
                        "eventClassifierCode": "ACT",
                        "eventDateTime": "2023-06-10T19:00:00-07:00",
                        "carrierSpecificData": {
                            "internalEventCode": "AVD",
                            "internalEventLabel": "Vessel Departure",
                            "internalLocationCode": "USLAX",
                            "internalFacilityCode": "USLAXMETS",
                            "bookingExportVoyageReference": "0FTHSN1MA",
                            "transportationPhase": "Export",
                            "shipmentLocationType": "POL",
                            "transportCallSequenceTotal": 2,
                            "numberOfUnits": 12
                        },
                        "transportEventTypeCode": "DEPA",
                        "transportCall": {
                            "transportCallID": "50002856834",
                            "exportVoyageNumber": "0FTHSN1MA",
                            "transportCallSequenceNumber": 1,
                            "facilityCode": "ETS",
                            "facilityCodeListProvider": "SMDG",
                            "modeOfTransport": "VESSEL",
                            "location": {
                                "locationName": "LOS ANGELES, CA",
                                "latitude": "34.05222",
                                "longitude": "-118.24278",
                                "address": {
                                    "name": "389 TERMINAL ISLAND WAY",
                                    "street": "BERTHS 226-236",
                                    "postCode": "90731",
                                    "city": "LOS ANGELES",
                                    "country": "UNITED STATES"
                                }
                            },
                            "vessel": {
                                "vesselIMONumber": "9850848",
                                "vesselName": "EVER FOND",
                                "vesselFlag": "LR",
                                "vesselCallSignNumber": "5LCS5",
                                "vesselOperatorCarrierCode": "EMC"
                            }
                        },
                        "documentReferences": [{
                            "documentReferenceType": "BKG",
                            "documentReferenceValue": "401f423b25b649a73b7b64f232d9a33efcdd1a788e0992edfd8c48449f927dce"
                        }],
                        "references": [{"referenceType": "EQ", "referenceValue": "APZU3856920"}, {
                            "referenceType": "EQ",
                            "referenceValue": "APZU3936760"
                        }, {"referenceType": "EQ", "referenceValue": "CAIU3707093"}, {
                            "referenceType": "EQ",
                            "referenceValue": "CMAU0323116"
                        }, {"referenceType": "EQ", "referenceValue": "CMAU0875630"}, {
                            "referenceType": "EQ",
                            "referenceValue": "MAGU2239792"
                        }, {"referenceType": "EQ", "referenceValue": "TCLU7252194"}, {
                            "referenceType": "EQ",
                            "referenceValue": "TEMU0227469"
                        }, {"referenceType": "EQ", "referenceValue": "TEMU3240783"}, {
                            "referenceType": "EQ",
                            "referenceValue": "TLLU2806305"
                        }, {"referenceType": "EQ", "referenceValue": "TRHU3662231"}, {
                            "referenceType": "EQ",
                            "referenceValue": "TRLU9614964"
                        }],
                        "equipmentReference": "TEMU3240783"
                    }, {
                        "eventID": "4a9c48ca135f34e67663c7524738847a135ddfc7",
                        "eventCreatedDateTime": "2023-06-11T05:39:49+00:00",
                        "eventType": "EQUIPMENT",
                        "eventClassifierCode": "ACT",
                        "eventDateTime": "2023-06-10T13:52:00-07:00",
                        "carrierSpecificData": {
                            "internalEventCode": "XOF",
                            "internalEventLabel": "Loaded on board",
                            "internalLocationCode": "USLAX",
                            "internalFacilityCode": "USLAXMETS",
                            "transportationPhase": "Export"
                        },
                        "transportCall": {
                            "transportCallID": "391603a3-787f-4c83-9d87-f05b7f5218c5",
                            "exportVoyageNumber": "0FTHSN1MA",
                            "facilityCode": "ETS",
                            "facilityCodeListProvider": "SMDG",
                            "modeOfTransport": "VESSEL",
                            "location": {
                                "locationName": "LOS ANGELES, CA",
                                "latitude": "34.05222",
                                "longitude": "-118.24278",
                                "address": {
                                    "name": "389 TERMINAL ISLAND WAY",
                                    "street": "BERTHS 226-236",
                                    "postCode": "90731",
                                    "city": "LOS ANGELES",
                                    "country": "UNITED STATES"
                                }
                            },
                            "vessel": {
                                "vesselIMONumber": "9850848",
                                "vesselName": "EVER FOND",
                                "vesselFlag": "LR",
                                "vesselCallSignNumber": "5LCS5",
                                "vesselOperatorCarrierCode": "EMC"
                            }
                        },
                        "documentReferences": [{
                            "documentReferenceType": "BKG",
                            "documentReferenceValue": "401f423b25b649a73b7b64f232d9a33efcdd1a788e0992edfd8c48449f927dce"
                        }],
                        "equipmentEventTypeCode": "LOAD",
                        "equipmentReference": "TEMU3240783",
                        "ISOEquipmentCode": "22G1",
                        "emptyIndicatorCode": "LADEN",
                        "isoequipmentCode": "22G1"
                    }, {
                        "eventID": "0673fe892c99e0bfe4a93fcc4f0e7ac09366e894",
                        "eventCreatedDateTime": "2023-05-30T18:29:03+00:00",
                        "eventType": "EQUIPMENT",
                        "eventClassifierCode": "ACT",
                        "eventDateTime": "2023-05-30T11:12:00-07:00",
                        "carrierSpecificData": {
                            "internalEventCode": "XRX",
                            "internalEventLabel": "Gate in at Port terminal",
                            "internalLocationCode": "USLAX",
                            "internalFacilityCode": "USLAXMETS",
                            "transportationPhase": "Export"
                        },
                        "transportCall": {
                            "transportCallID": "65fbd982-f92b-4a8b-9299-0de7ae7f46c6",
                            "facilityCode": "ETS",
                            "facilityCodeListProvider": "SMDG",
                            "modeOfTransport": "TRUCK",
                            "location": {
                                "locationName": "LOS ANGELES, CA",
                                "latitude": "34.05222",
                                "longitude": "-118.24278",
                                "address": {
                                    "name": "389 TERMINAL ISLAND WAY",
                                    "street": "BERTHS 226-236",
                                    "postCode": "90731",
                                    "city": "LOS ANGELES",
                                    "country": "UNITED STATES"
                                }
                            }
                        },
                        "documentReferences": [{
                            "documentReferenceType": "BKG",
                            "documentReferenceValue": "401f423b25b649a73b7b64f232d9a33efcdd1a788e0992edfd8c48449f927dce"
                        }],
                        "equipmentEventTypeCode": "GTIN",
                        "equipmentReference": "TEMU3240783",
                        "ISOEquipmentCode": "22G1",
                        "emptyIndicatorCode": "LADEN",
                        "isoequipmentCode": "22G1"
                    }, {
                        "eventID": "83797c808a620efed0a42224d42dc3f0bebfa5cc",
                        "eventCreatedDateTime": "2023-05-17T08:50:25+00:00",
                        "eventType": "EQUIPMENT",
                        "eventClassifierCode": "ACT",
                        "eventDateTime": "2023-05-17T00:42:00-07:00",
                        "carrierSpecificData": {
                            "internalEventCode": "MOS",
                            "internalEventLabel": "Empty Picked-up at Depot",
                            "internalLocationCode": "USLAX",
                            "internalFacilityCode": "USLAXSRIO",
                            "transportationPhase": "Export"
                        },
                        "transportCall": {
                            "transportCallID": "080e2ed3-8f7b-469a-876b-ca45b54383ad",
                            "modeOfTransport": "TRUCK",
                            "location": {
                                "locationName": "LOS ANGELES, CA",
                                "latitude": "34.05222",
                                "longitude": "-118.24278",
                                "address": {
                                    "name": "SUCKOW ROAD",
                                    "postCode": "93516",
                                    "city": "LOS ANGELES",
                                    "country": "UNITED STATES"
                                }
                            }
                        },
                        "documentReferences": [{
                            "documentReferenceType": "BKG",
                            "documentReferenceValue": "401f423b25b649a73b7b64f232d9a33efcdd1a788e0992edfd8c48449f927dce"
                        }],
                        "equipmentEventTypeCode": "GTOT",
                        "equipmentReference": "TEMU3240783",
                        "ISOEquipmentCode": "22G1",
                        "emptyIndicatorCode": "EMPTY",
                        "isoequipmentCode": "22G1"
                    }]
                }, {
                    "containerRef": "APZU3856920", "equipmentSize": "22G1", "movement": [{
                        "eventID": "0e1e55da0ea7439dd7eb66f9988e8fa0f6a6c1a6",
                        "eventCreatedDateTime": "2023-06-13T02:33:07+00:00",
                        "eventType": "TRANSPORT",
                        "eventClassifierCode": "PLN",
                        "eventDateTime": "2023-07-18T04:18:00+08:00",
                        "carrierSpecificData": {
                            "internalEventCode": "PVA",
                            "internalEventLabel": "Vessel Arrival",
                            "internalLocationCode": "CNSHK",
                            "internalFacilityCode": "CNSHKDSCT",
                            "bookingExportVoyageReference": "0FTHSN1MA",
                            "transportationPhase": "Import",
                            "shipmentLocationType": "POD",
                            "transportCallSequenceTotal": 2,
                            "numberOfUnits": 12
                        },
                        "transportEventTypeCode": "ARRI",
                        "transportCall": {
                            "transportCallID": "50002857703",
                            "importVoyageNumber": "0FTHSN1MA",
                            "transportCallSequenceNumber": 2,
                            "facilityCode": "SCT",
                            "facilityCodeListProvider": "SMDG",
                            "modeOfTransport": "VESSEL",
                            "location": {
                                "locationName": "SHEKOU",
                                "latitude": "22.49639",
                                "longitude": "113.92",
                                "address": {
                                    "name": "JETTY THREE, HARBOUR ROAD,",
                                    "street": ".",
                                    "city": "SHEKOU",
                                    "country": "CHINA"
                                }
                            },
                            "vessel": {
                                "vesselIMONumber": "9850848",
                                "vesselName": "EVER FOND",
                                "vesselFlag": "LR",
                                "vesselCallSignNumber": "5LCS5",
                                "vesselOperatorCarrierCode": "EMC"
                            }
                        },
                        "documentReferences": [{
                            "documentReferenceType": "BKG",
                            "documentReferenceValue": "401f423b25b649a73b7b64f232d9a33efcdd1a788e0992edfd8c48449f927dce"
                        }],
                        "references": [{"referenceType": "EQ", "referenceValue": "APZU3856920"}, {
                            "referenceType": "EQ",
                            "referenceValue": "APZU3936760"
                        }, {"referenceType": "EQ", "referenceValue": "CAIU3707093"}, {
                            "referenceType": "EQ",
                            "referenceValue": "CMAU0323116"
                        }, {"referenceType": "EQ", "referenceValue": "CMAU0875630"}, {
                            "referenceType": "EQ",
                            "referenceValue": "MAGU2239792"
                        }, {"referenceType": "EQ", "referenceValue": "TCLU7252194"}, {
                            "referenceType": "EQ",
                            "referenceValue": "TEMU0227469"
                        }, {"referenceType": "EQ", "referenceValue": "TEMU3240783"}, {
                            "referenceType": "EQ",
                            "referenceValue": "TLLU2806305"
                        }, {"referenceType": "EQ", "referenceValue": "TRHU3662231"}, {
                            "referenceType": "EQ",
                            "referenceValue": "TRLU9614964"
                        }],
                        "equipmentReference": "APZU3856920"
                    }, {
                        "eventID": "91c2c128b8913862789f84fc9674abe5064d09f7",
                        "eventCreatedDateTime": "2023-06-13T02:33:07+00:00",
                        "eventType": "TRANSPORT",
                        "eventClassifierCode": "PLN",
                        "eventDateTime": "2023-06-11T06:27:00-07:00",
                        "carrierSpecificData": {
                            "internalEventCode": "PVD",
                            "internalEventLabel": "Vessel Departure",
                            "internalLocationCode": "USLAX",
                            "internalFacilityCode": "USLAXMETS",
                            "bookingExportVoyageReference": "0FTHSN1MA",
                            "transportationPhase": "Export",
                            "shipmentLocationType": "POL",
                            "transportCallSequenceTotal": 2,
                            "numberOfUnits": 12
                        },
                        "transportEventTypeCode": "DEPA",
                        "transportCall": {
                            "transportCallID": "50002856834",
                            "exportVoyageNumber": "0FTHSN1MA",
                            "transportCallSequenceNumber": 1,
                            "facilityCode": "ETS",
                            "facilityCodeListProvider": "SMDG",
                            "modeOfTransport": "VESSEL",
                            "location": {
                                "locationName": "LOS ANGELES, CA",
                                "latitude": "34.05222",
                                "longitude": "-118.24278",
                                "address": {
                                    "name": "389 TERMINAL ISLAND WAY",
                                    "street": "BERTHS 226-236",
                                    "postCode": "90731",
                                    "city": "LOS ANGELES",
                                    "country": "UNITED STATES"
                                }
                            },
                            "vessel": {
                                "vesselIMONumber": "9850848",
                                "vesselName": "EVER FOND",
                                "vesselFlag": "LR",
                                "vesselCallSignNumber": "5LCS5",
                                "vesselOperatorCarrierCode": "EMC"
                            }
                        },
                        "documentReferences": [{
                            "documentReferenceType": "BKG",
                            "documentReferenceValue": "401f423b25b649a73b7b64f232d9a33efcdd1a788e0992edfd8c48449f927dce"
                        }],
                        "references": [{"referenceType": "EQ", "referenceValue": "APZU3856920"}, {
                            "referenceType": "EQ",
                            "referenceValue": "APZU3936760"
                        }, {"referenceType": "EQ", "referenceValue": "CAIU3707093"}, {
                            "referenceType": "EQ",
                            "referenceValue": "CMAU0323116"
                        }, {"referenceType": "EQ", "referenceValue": "CMAU0875630"}, {
                            "referenceType": "EQ",
                            "referenceValue": "MAGU2239792"
                        }, {"referenceType": "EQ", "referenceValue": "TCLU7252194"}, {
                            "referenceType": "EQ",
                            "referenceValue": "TEMU0227469"
                        }, {"referenceType": "EQ", "referenceValue": "TEMU3240783"}, {
                            "referenceType": "EQ",
                            "referenceValue": "TLLU2806305"
                        }, {"referenceType": "EQ", "referenceValue": "TRHU3662231"}, {
                            "referenceType": "EQ",
                            "referenceValue": "TRLU9614964"
                        }],
                        "equipmentReference": "APZU3856920"
                    }, {
                        "eventID": "93be2a319f6bb52aa06bbcd65827c340674e488b",
                        "eventCreatedDateTime": "2023-06-11T03:04:05+00:00",
                        "eventType": "TRANSPORT",
                        "eventClassifierCode": "ACT",
                        "eventDateTime": "2023-06-10T19:00:00-07:00",
                        "carrierSpecificData": {
                            "internalEventCode": "AVD",
                            "internalEventLabel": "Vessel Departure",
                            "internalLocationCode": "USLAX",
                            "internalFacilityCode": "USLAXMETS",
                            "bookingExportVoyageReference": "0FTHSN1MA",
                            "transportationPhase": "Export",
                            "shipmentLocationType": "POL",
                            "transportCallSequenceTotal": 2,
                            "numberOfUnits": 12
                        },
                        "transportEventTypeCode": "DEPA",
                        "transportCall": {
                            "transportCallID": "50002856834",
                            "exportVoyageNumber": "0FTHSN1MA",
                            "transportCallSequenceNumber": 1,
                            "facilityCode": "ETS",
                            "facilityCodeListProvider": "SMDG",
                            "modeOfTransport": "VESSEL",
                            "location": {
                                "locationName": "LOS ANGELES, CA",
                                "latitude": "34.05222",
                                "longitude": "-118.24278",
                                "address": {
                                    "name": "389 TERMINAL ISLAND WAY",
                                    "street": "BERTHS 226-236",
                                    "postCode": "90731",
                                    "city": "LOS ANGELES",
                                    "country": "UNITED STATES"
                                }
                            },
                            "vessel": {
                                "vesselIMONumber": "9850848",
                                "vesselName": "EVER FOND",
                                "vesselFlag": "LR",
                                "vesselCallSignNumber": "5LCS5",
                                "vesselOperatorCarrierCode": "EMC"
                            }
                        },
                        "documentReferences": [{
                            "documentReferenceType": "BKG",
                            "documentReferenceValue": "401f423b25b649a73b7b64f232d9a33efcdd1a788e0992edfd8c48449f927dce"
                        }],
                        "references": [{"referenceType": "EQ", "referenceValue": "APZU3856920"}, {
                            "referenceType": "EQ",
                            "referenceValue": "APZU3936760"
                        }, {"referenceType": "EQ", "referenceValue": "CAIU3707093"}, {
                            "referenceType": "EQ",
                            "referenceValue": "CMAU0323116"
                        }, {"referenceType": "EQ", "referenceValue": "CMAU0875630"}, {
                            "referenceType": "EQ",
                            "referenceValue": "MAGU2239792"
                        }, {"referenceType": "EQ", "referenceValue": "TCLU7252194"}, {
                            "referenceType": "EQ",
                            "referenceValue": "TEMU0227469"
                        }, {"referenceType": "EQ", "referenceValue": "TEMU3240783"}, {
                            "referenceType": "EQ",
                            "referenceValue": "TLLU2806305"
                        }, {"referenceType": "EQ", "referenceValue": "TRHU3662231"}, {
                            "referenceType": "EQ",
                            "referenceValue": "TRLU9614964"
                        }],
                        "equipmentReference": "APZU3856920"
                    }, {
                        "eventID": "28da846f2fd8cadf5109fe395f93153f6ab5c93d",
                        "eventCreatedDateTime": "2023-06-11T05:41:18+00:00",
                        "eventType": "EQUIPMENT",
                        "eventClassifierCode": "ACT",
                        "eventDateTime": "2023-06-10T13:45:00-07:00",
                        "carrierSpecificData": {
                            "internalEventCode": "XOF",
                            "internalEventLabel": "Loaded on board",
                            "internalLocationCode": "USLAX",
                            "internalFacilityCode": "USLAXMETS",
                            "transportationPhase": "Export"
                        },
                        "transportCall": {
                            "transportCallID": "28b92780-24af-40b6-9363-e4ccbfbf28cd",
                            "exportVoyageNumber": "0FTHSN1MA",
                            "facilityCode": "ETS",
                            "facilityCodeListProvider": "SMDG",
                            "modeOfTransport": "VESSEL",
                            "location": {
                                "locationName": "LOS ANGELES, CA",
                                "latitude": "34.05222",
                                "longitude": "-118.24278",
                                "address": {
                                    "name": "389 TERMINAL ISLAND WAY",
                                    "street": "BERTHS 226-236",
                                    "postCode": "90731",
                                    "city": "LOS ANGELES",
                                    "country": "UNITED STATES"
                                }
                            },
                            "vessel": {
                                "vesselIMONumber": "9850848",
                                "vesselName": "EVER FOND",
                                "vesselFlag": "LR",
                                "vesselCallSignNumber": "5LCS5",
                                "vesselOperatorCarrierCode": "EMC"
                            }
                        },
                        "documentReferences": [{
                            "documentReferenceType": "BKG",
                            "documentReferenceValue": "401f423b25b649a73b7b64f232d9a33efcdd1a788e0992edfd8c48449f927dce"
                        }],
                        "equipmentEventTypeCode": "LOAD",
                        "equipmentReference": "APZU3856920",
                        "ISOEquipmentCode": "22G1",
                        "emptyIndicatorCode": "LADEN",
                        "isoequipmentCode": "22G1"
                    }, {
                        "eventID": "7f5e6defe87efca5197672a37c7258707ccaddb8",
                        "eventCreatedDateTime": "2023-05-30T16:28:47+00:00",
                        "eventType": "EQUIPMENT",
                        "eventClassifierCode": "ACT",
                        "eventDateTime": "2023-05-30T08:57:00-07:00",
                        "carrierSpecificData": {
                            "internalEventCode": "XRX",
                            "internalEventLabel": "Gate in at Port terminal",
                            "internalLocationCode": "USLAX",
                            "internalFacilityCode": "USLAXMETS",
                            "transportationPhase": "Export"
                        },
                        "transportCall": {
                            "transportCallID": "7f15732c-1be6-428e-b3c6-3ddba04505f6",
                            "facilityCode": "ETS",
                            "facilityCodeListProvider": "SMDG",
                            "modeOfTransport": "TRUCK",
                            "location": {
                                "locationName": "LOS ANGELES, CA",
                                "latitude": "34.05222",
                                "longitude": "-118.24278",
                                "address": {
                                    "name": "389 TERMINAL ISLAND WAY",
                                    "street": "BERTHS 226-236",
                                    "postCode": "90731",
                                    "city": "LOS ANGELES",
                                    "country": "UNITED STATES"
                                }
                            }
                        },
                        "documentReferences": [{
                            "documentReferenceType": "BKG",
                            "documentReferenceValue": "401f423b25b649a73b7b64f232d9a33efcdd1a788e0992edfd8c48449f927dce"
                        }],
                        "equipmentEventTypeCode": "GTIN",
                        "equipmentReference": "APZU3856920",
                        "ISOEquipmentCode": "22G1",
                        "emptyIndicatorCode": "LADEN",
                        "isoequipmentCode": "22G1"
                    }, {
                        "eventID": "1d3d9f4923c5bbe12133a0459c74227974fc6a79",
                        "eventCreatedDateTime": "2023-05-16T04:19:17+00:00",
                        "eventType": "EQUIPMENT",
                        "eventClassifierCode": "ACT",
                        "eventDateTime": "2023-05-15T21:06:00-07:00",
                        "carrierSpecificData": {
                            "internalEventCode": "MOS",
                            "internalEventLabel": "Empty Picked-up at Depot",
                            "internalLocationCode": "USLAX",
                            "internalFacilityCode": "USLAXSRIO",
                            "transportationPhase": "Export"
                        },
                        "transportCall": {
                            "transportCallID": "d771cac7-96dd-4dac-8a01-34912e4d55c3",
                            "modeOfTransport": "TRUCK",
                            "location": {
                                "locationName": "LOS ANGELES, CA",
                                "latitude": "34.05222",
                                "longitude": "-118.24278",
                                "address": {
                                    "name": "SUCKOW ROAD",
                                    "postCode": "93516",
                                    "city": "LOS ANGELES",
                                    "country": "UNITED STATES"
                                }
                            }
                        },
                        "documentReferences": [{
                            "documentReferenceType": "BKG",
                            "documentReferenceValue": "401f423b25b649a73b7b64f232d9a33efcdd1a788e0992edfd8c48449f927dce"
                        }],
                        "equipmentEventTypeCode": "GTOT",
                        "equipmentReference": "APZU3856920",
                        "ISOEquipmentCode": "22G1",
                        "emptyIndicatorCode": "EMPTY",
                        "isoequipmentCode": "22G1"
                    }]
                }, {
                    "containerRef": "TCLU7252194", "equipmentSize": "22G1", "movement": [{
                        "eventID": "0e1e55da0ea7439dd7eb66f9988e8fa0f6a6c1a6",
                        "eventCreatedDateTime": "2023-06-13T02:33:07+00:00",
                        "eventType": "TRANSPORT",
                        "eventClassifierCode": "PLN",
                        "eventDateTime": "2023-07-18T04:18:00+08:00",
                        "carrierSpecificData": {
                            "internalEventCode": "PVA",
                            "internalEventLabel": "Vessel Arrival",
                            "internalLocationCode": "CNSHK",
                            "internalFacilityCode": "CNSHKDSCT",
                            "bookingExportVoyageReference": "0FTHSN1MA",
                            "transportationPhase": "Import",
                            "shipmentLocationType": "POD",
                            "transportCallSequenceTotal": 2,
                            "numberOfUnits": 12
                        },
                        "transportEventTypeCode": "ARRI",
                        "transportCall": {
                            "transportCallID": "50002857703",
                            "importVoyageNumber": "0FTHSN1MA",
                            "transportCallSequenceNumber": 2,
                            "facilityCode": "SCT",
                            "facilityCodeListProvider": "SMDG",
                            "modeOfTransport": "VESSEL",
                            "location": {
                                "locationName": "SHEKOU",
                                "latitude": "22.49639",
                                "longitude": "113.92",
                                "address": {
                                    "name": "JETTY THREE, HARBOUR ROAD,",
                                    "street": ".",
                                    "city": "SHEKOU",
                                    "country": "CHINA"
                                }
                            },
                            "vessel": {
                                "vesselIMONumber": "9850848",
                                "vesselName": "EVER FOND",
                                "vesselFlag": "LR",
                                "vesselCallSignNumber": "5LCS5",
                                "vesselOperatorCarrierCode": "EMC"
                            }
                        },
                        "documentReferences": [{
                            "documentReferenceType": "BKG",
                            "documentReferenceValue": "401f423b25b649a73b7b64f232d9a33efcdd1a788e0992edfd8c48449f927dce"
                        }],
                        "references": [{"referenceType": "EQ", "referenceValue": "APZU3856920"}, {
                            "referenceType": "EQ",
                            "referenceValue": "APZU3936760"
                        }, {"referenceType": "EQ", "referenceValue": "CAIU3707093"}, {
                            "referenceType": "EQ",
                            "referenceValue": "CMAU0323116"
                        }, {"referenceType": "EQ", "referenceValue": "CMAU0875630"}, {
                            "referenceType": "EQ",
                            "referenceValue": "MAGU2239792"
                        }, {"referenceType": "EQ", "referenceValue": "TCLU7252194"}, {
                            "referenceType": "EQ",
                            "referenceValue": "TEMU0227469"
                        }, {"referenceType": "EQ", "referenceValue": "TEMU3240783"}, {
                            "referenceType": "EQ",
                            "referenceValue": "TLLU2806305"
                        }, {"referenceType": "EQ", "referenceValue": "TRHU3662231"}, {
                            "referenceType": "EQ",
                            "referenceValue": "TRLU9614964"
                        }],
                        "equipmentReference": "TCLU7252194"
                    }, {
                        "eventID": "91c2c128b8913862789f84fc9674abe5064d09f7",
                        "eventCreatedDateTime": "2023-06-13T02:33:07+00:00",
                        "eventType": "TRANSPORT",
                        "eventClassifierCode": "PLN",
                        "eventDateTime": "2023-06-11T06:27:00-07:00",
                        "carrierSpecificData": {
                            "internalEventCode": "PVD",
                            "internalEventLabel": "Vessel Departure",
                            "internalLocationCode": "USLAX",
                            "internalFacilityCode": "USLAXMETS",
                            "bookingExportVoyageReference": "0FTHSN1MA",
                            "transportationPhase": "Export",
                            "shipmentLocationType": "POL",
                            "transportCallSequenceTotal": 2,
                            "numberOfUnits": 12
                        },
                        "transportEventTypeCode": "DEPA",
                        "transportCall": {
                            "transportCallID": "50002856834",
                            "exportVoyageNumber": "0FTHSN1MA",
                            "transportCallSequenceNumber": 1,
                            "facilityCode": "ETS",
                            "facilityCodeListProvider": "SMDG",
                            "modeOfTransport": "VESSEL",
                            "location": {
                                "locationName": "LOS ANGELES, CA",
                                "latitude": "34.05222",
                                "longitude": "-118.24278",
                                "address": {
                                    "name": "389 TERMINAL ISLAND WAY",
                                    "street": "BERTHS 226-236",
                                    "postCode": "90731",
                                    "city": "LOS ANGELES",
                                    "country": "UNITED STATES"
                                }
                            },
                            "vessel": {
                                "vesselIMONumber": "9850848",
                                "vesselName": "EVER FOND",
                                "vesselFlag": "LR",
                                "vesselCallSignNumber": "5LCS5",
                                "vesselOperatorCarrierCode": "EMC"
                            }
                        },
                        "documentReferences": [{
                            "documentReferenceType": "BKG",
                            "documentReferenceValue": "401f423b25b649a73b7b64f232d9a33efcdd1a788e0992edfd8c48449f927dce"
                        }],
                        "references": [{"referenceType": "EQ", "referenceValue": "APZU3856920"}, {
                            "referenceType": "EQ",
                            "referenceValue": "APZU3936760"
                        }, {"referenceType": "EQ", "referenceValue": "CAIU3707093"}, {
                            "referenceType": "EQ",
                            "referenceValue": "CMAU0323116"
                        }, {"referenceType": "EQ", "referenceValue": "CMAU0875630"}, {
                            "referenceType": "EQ",
                            "referenceValue": "MAGU2239792"
                        }, {"referenceType": "EQ", "referenceValue": "TCLU7252194"}, {
                            "referenceType": "EQ",
                            "referenceValue": "TEMU0227469"
                        }, {"referenceType": "EQ", "referenceValue": "TEMU3240783"}, {
                            "referenceType": "EQ",
                            "referenceValue": "TLLU2806305"
                        }, {"referenceType": "EQ", "referenceValue": "TRHU3662231"}, {
                            "referenceType": "EQ",
                            "referenceValue": "TRLU9614964"
                        }],
                        "equipmentReference": "TCLU7252194"
                    }, {
                        "eventID": "93be2a319f6bb52aa06bbcd65827c340674e488b",
                        "eventCreatedDateTime": "2023-06-11T03:04:05+00:00",
                        "eventType": "TRANSPORT",
                        "eventClassifierCode": "ACT",
                        "eventDateTime": "2023-06-10T19:00:00-07:00",
                        "carrierSpecificData": {
                            "internalEventCode": "AVD",
                            "internalEventLabel": "Vessel Departure",
                            "internalLocationCode": "USLAX",
                            "internalFacilityCode": "USLAXMETS",
                            "bookingExportVoyageReference": "0FTHSN1MA",
                            "transportationPhase": "Export",
                            "shipmentLocationType": "POL",
                            "transportCallSequenceTotal": 2,
                            "numberOfUnits": 12
                        },
                        "transportEventTypeCode": "DEPA",
                        "transportCall": {
                            "transportCallID": "50002856834",
                            "exportVoyageNumber": "0FTHSN1MA",
                            "transportCallSequenceNumber": 1,
                            "facilityCode": "ETS",
                            "facilityCodeListProvider": "SMDG",
                            "modeOfTransport": "VESSEL",
                            "location": {
                                "locationName": "LOS ANGELES, CA",
                                "latitude": "34.05222",
                                "longitude": "-118.24278",
                                "address": {
                                    "name": "389 TERMINAL ISLAND WAY",
                                    "street": "BERTHS 226-236",
                                    "postCode": "90731",
                                    "city": "LOS ANGELES",
                                    "country": "UNITED STATES"
                                }
                            },
                            "vessel": {
                                "vesselIMONumber": "9850848",
                                "vesselName": "EVER FOND",
                                "vesselFlag": "LR",
                                "vesselCallSignNumber": "5LCS5",
                                "vesselOperatorCarrierCode": "EMC"
                            }
                        },
                        "documentReferences": [{
                            "documentReferenceType": "BKG",
                            "documentReferenceValue": "401f423b25b649a73b7b64f232d9a33efcdd1a788e0992edfd8c48449f927dce"
                        }],
                        "references": [{"referenceType": "EQ", "referenceValue": "APZU3856920"}, {
                            "referenceType": "EQ",
                            "referenceValue": "APZU3936760"
                        }, {"referenceType": "EQ", "referenceValue": "CAIU3707093"}, {
                            "referenceType": "EQ",
                            "referenceValue": "CMAU0323116"
                        }, {"referenceType": "EQ", "referenceValue": "CMAU0875630"}, {
                            "referenceType": "EQ",
                            "referenceValue": "MAGU2239792"
                        }, {"referenceType": "EQ", "referenceValue": "TCLU7252194"}, {
                            "referenceType": "EQ",
                            "referenceValue": "TEMU0227469"
                        }, {"referenceType": "EQ", "referenceValue": "TEMU3240783"}, {
                            "referenceType": "EQ",
                            "referenceValue": "TLLU2806305"
                        }, {"referenceType": "EQ", "referenceValue": "TRHU3662231"}, {
                            "referenceType": "EQ",
                            "referenceValue": "TRLU9614964"
                        }],
                        "equipmentReference": "TCLU7252194"
                    }, {
                        "eventID": "ff8a8d73e3f11109af27d74b0e9da3e92911a98d",
                        "eventCreatedDateTime": "2023-06-11T05:41:07+00:00",
                        "eventType": "EQUIPMENT",
                        "eventClassifierCode": "ACT",
                        "eventDateTime": "2023-06-10T13:49:00-07:00",
                        "carrierSpecificData": {
                            "internalEventCode": "XOF",
                            "internalEventLabel": "Loaded on board",
                            "internalLocationCode": "USLAX",
                            "internalFacilityCode": "USLAXMETS",
                            "transportationPhase": "Export"
                        },
                        "transportCall": {
                            "transportCallID": "e217d710-c800-4d32-af13-23b03e75e5d1",
                            "exportVoyageNumber": "0FTHSN1MA",
                            "facilityCode": "ETS",
                            "facilityCodeListProvider": "SMDG",
                            "modeOfTransport": "VESSEL",
                            "location": {
                                "locationName": "LOS ANGELES, CA",
                                "latitude": "34.05222",
                                "longitude": "-118.24278",
                                "address": {
                                    "name": "389 TERMINAL ISLAND WAY",
                                    "street": "BERTHS 226-236",
                                    "postCode": "90731",
                                    "city": "LOS ANGELES",
                                    "country": "UNITED STATES"
                                }
                            },
                            "vessel": {
                                "vesselIMONumber": "9850848",
                                "vesselName": "EVER FOND",
                                "vesselFlag": "LR",
                                "vesselCallSignNumber": "5LCS5",
                                "vesselOperatorCarrierCode": "EMC"
                            }
                        },
                        "documentReferences": [{
                            "documentReferenceType": "BKG",
                            "documentReferenceValue": "401f423b25b649a73b7b64f232d9a33efcdd1a788e0992edfd8c48449f927dce"
                        }],
                        "equipmentEventTypeCode": "LOAD",
                        "equipmentReference": "TCLU7252194",
                        "ISOEquipmentCode": "22G1",
                        "emptyIndicatorCode": "LADEN",
                        "isoequipmentCode": "22G1"
                    }, {
                        "eventID": "79d23e724441fc7c468c007a1ca91f4e8c660d12",
                        "eventCreatedDateTime": "2023-05-30T22:08:34+00:00",
                        "eventType": "EQUIPMENT",
                        "eventClassifierCode": "ACT",
                        "eventDateTime": "2023-05-30T14:52:00-07:00",
                        "carrierSpecificData": {
                            "internalEventCode": "XRX",
                            "internalEventLabel": "Gate in at Port terminal",
                            "internalLocationCode": "USLAX",
                            "internalFacilityCode": "USLAXMETS",
                            "transportationPhase": "Export"
                        },
                        "transportCall": {
                            "transportCallID": "5f5411f8-c3f8-404a-b263-adeea45a021a",
                            "facilityCode": "ETS",
                            "facilityCodeListProvider": "SMDG",
                            "modeOfTransport": "TRUCK",
                            "location": {
                                "locationName": "LOS ANGELES, CA",
                                "latitude": "34.05222",
                                "longitude": "-118.24278",
                                "address": {
                                    "name": "389 TERMINAL ISLAND WAY",
                                    "street": "BERTHS 226-236",
                                    "postCode": "90731",
                                    "city": "LOS ANGELES",
                                    "country": "UNITED STATES"
                                }
                            }
                        },
                        "documentReferences": [{
                            "documentReferenceType": "BKG",
                            "documentReferenceValue": "401f423b25b649a73b7b64f232d9a33efcdd1a788e0992edfd8c48449f927dce"
                        }],
                        "equipmentEventTypeCode": "GTIN",
                        "equipmentReference": "TCLU7252194",
                        "ISOEquipmentCode": "22G1",
                        "emptyIndicatorCode": "LADEN",
                        "isoequipmentCode": "22G1"
                    }, {
                        "eventID": "28d33aa0aca11db87214038e7bad162bfffe8125",
                        "eventCreatedDateTime": "2023-05-20T07:53:00+00:00",
                        "eventType": "EQUIPMENT",
                        "eventClassifierCode": "ACT",
                        "eventDateTime": "2023-05-20T00:44:00-07:00",
                        "carrierSpecificData": {
                            "internalEventCode": "MOS",
                            "internalEventLabel": "Empty Picked-up at Depot",
                            "internalLocationCode": "USLAX",
                            "internalFacilityCode": "USLAXSRIO",
                            "transportationPhase": "Export"
                        },
                        "transportCall": {
                            "transportCallID": "aa558f9f-932d-4734-89bb-a8efc7be9aec",
                            "modeOfTransport": "TRUCK",
                            "location": {
                                "locationName": "LOS ANGELES, CA",
                                "latitude": "34.05222",
                                "longitude": "-118.24278",
                                "address": {
                                    "name": "SUCKOW ROAD",
                                    "postCode": "93516",
                                    "city": "LOS ANGELES",
                                    "country": "UNITED STATES"
                                }
                            }
                        },
                        "documentReferences": [{
                            "documentReferenceType": "BKG",
                            "documentReferenceValue": "401f423b25b649a73b7b64f232d9a33efcdd1a788e0992edfd8c48449f927dce"
                        }],
                        "equipmentEventTypeCode": "GTOT",
                        "equipmentReference": "TCLU7252194",
                        "ISOEquipmentCode": "22G1",
                        "emptyIndicatorCode": "EMPTY",
                        "isoequipmentCode": "22G1"
                    }]
                }, {
                    "containerRef": "CMAU0875630", "equipmentSize": "22G1", "movement": [{
                        "eventID": "0e1e55da0ea7439dd7eb66f9988e8fa0f6a6c1a6",
                        "eventCreatedDateTime": "2023-06-13T02:33:07+00:00",
                        "eventType": "TRANSPORT",
                        "eventClassifierCode": "PLN",
                        "eventDateTime": "2023-07-18T04:18:00+08:00",
                        "carrierSpecificData": {
                            "internalEventCode": "PVA",
                            "internalEventLabel": "Vessel Arrival",
                            "internalLocationCode": "CNSHK",
                            "internalFacilityCode": "CNSHKDSCT",
                            "bookingExportVoyageReference": "0FTHSN1MA",
                            "transportationPhase": "Import",
                            "shipmentLocationType": "POD",
                            "transportCallSequenceTotal": 2,
                            "numberOfUnits": 12
                        },
                        "transportEventTypeCode": "ARRI",
                        "transportCall": {
                            "transportCallID": "50002857703",
                            "importVoyageNumber": "0FTHSN1MA",
                            "transportCallSequenceNumber": 2,
                            "facilityCode": "SCT",
                            "facilityCodeListProvider": "SMDG",
                            "modeOfTransport": "VESSEL",
                            "location": {
                                "locationName": "SHEKOU",
                                "latitude": "22.49639",
                                "longitude": "113.92",
                                "address": {
                                    "name": "JETTY THREE, HARBOUR ROAD,",
                                    "street": ".",
                                    "city": "SHEKOU",
                                    "country": "CHINA"
                                }
                            },
                            "vessel": {
                                "vesselIMONumber": "9850848",
                                "vesselName": "EVER FOND",
                                "vesselFlag": "LR",
                                "vesselCallSignNumber": "5LCS5",
                                "vesselOperatorCarrierCode": "EMC"
                            }
                        },
                        "documentReferences": [{
                            "documentReferenceType": "BKG",
                            "documentReferenceValue": "401f423b25b649a73b7b64f232d9a33efcdd1a788e0992edfd8c48449f927dce"
                        }],
                        "references": [{"referenceType": "EQ", "referenceValue": "APZU3856920"}, {
                            "referenceType": "EQ",
                            "referenceValue": "APZU3936760"
                        }, {"referenceType": "EQ", "referenceValue": "CAIU3707093"}, {
                            "referenceType": "EQ",
                            "referenceValue": "CMAU0323116"
                        }, {"referenceType": "EQ", "referenceValue": "CMAU0875630"}, {
                            "referenceType": "EQ",
                            "referenceValue": "MAGU2239792"
                        }, {"referenceType": "EQ", "referenceValue": "TCLU7252194"}, {
                            "referenceType": "EQ",
                            "referenceValue": "TEMU0227469"
                        }, {"referenceType": "EQ", "referenceValue": "TEMU3240783"}, {
                            "referenceType": "EQ",
                            "referenceValue": "TLLU2806305"
                        }, {"referenceType": "EQ", "referenceValue": "TRHU3662231"}, {
                            "referenceType": "EQ",
                            "referenceValue": "TRLU9614964"
                        }],
                        "equipmentReference": "CMAU0875630"
                    }, {
                        "eventID": "91c2c128b8913862789f84fc9674abe5064d09f7",
                        "eventCreatedDateTime": "2023-06-13T02:33:07+00:00",
                        "eventType": "TRANSPORT",
                        "eventClassifierCode": "PLN",
                        "eventDateTime": "2023-06-11T06:27:00-07:00",
                        "carrierSpecificData": {
                            "internalEventCode": "PVD",
                            "internalEventLabel": "Vessel Departure",
                            "internalLocationCode": "USLAX",
                            "internalFacilityCode": "USLAXMETS",
                            "bookingExportVoyageReference": "0FTHSN1MA",
                            "transportationPhase": "Export",
                            "shipmentLocationType": "POL",
                            "transportCallSequenceTotal": 2,
                            "numberOfUnits": 12
                        },
                        "transportEventTypeCode": "DEPA",
                        "transportCall": {
                            "transportCallID": "50002856834",
                            "exportVoyageNumber": "0FTHSN1MA",
                            "transportCallSequenceNumber": 1,
                            "facilityCode": "ETS",
                            "facilityCodeListProvider": "SMDG",
                            "modeOfTransport": "VESSEL",
                            "location": {
                                "locationName": "LOS ANGELES, CA",
                                "latitude": "34.05222",
                                "longitude": "-118.24278",
                                "address": {
                                    "name": "389 TERMINAL ISLAND WAY",
                                    "street": "BERTHS 226-236",
                                    "postCode": "90731",
                                    "city": "LOS ANGELES",
                                    "country": "UNITED STATES"
                                }
                            },
                            "vessel": {
                                "vesselIMONumber": "9850848",
                                "vesselName": "EVER FOND",
                                "vesselFlag": "LR",
                                "vesselCallSignNumber": "5LCS5",
                                "vesselOperatorCarrierCode": "EMC"
                            }
                        },
                        "documentReferences": [{
                            "documentReferenceType": "BKG",
                            "documentReferenceValue": "401f423b25b649a73b7b64f232d9a33efcdd1a788e0992edfd8c48449f927dce"
                        }],
                        "references": [{"referenceType": "EQ", "referenceValue": "APZU3856920"}, {
                            "referenceType": "EQ",
                            "referenceValue": "APZU3936760"
                        }, {"referenceType": "EQ", "referenceValue": "CAIU3707093"}, {
                            "referenceType": "EQ",
                            "referenceValue": "CMAU0323116"
                        }, {"referenceType": "EQ", "referenceValue": "CMAU0875630"}, {
                            "referenceType": "EQ",
                            "referenceValue": "MAGU2239792"
                        }, {"referenceType": "EQ", "referenceValue": "TCLU7252194"}, {
                            "referenceType": "EQ",
                            "referenceValue": "TEMU0227469"
                        }, {"referenceType": "EQ", "referenceValue": "TEMU3240783"}, {
                            "referenceType": "EQ",
                            "referenceValue": "TLLU2806305"
                        }, {"referenceType": "EQ", "referenceValue": "TRHU3662231"}, {
                            "referenceType": "EQ",
                            "referenceValue": "TRLU9614964"
                        }],
                        "equipmentReference": "CMAU0875630"
                    }, {
                        "eventID": "93be2a319f6bb52aa06bbcd65827c340674e488b",
                        "eventCreatedDateTime": "2023-06-11T03:04:05+00:00",
                        "eventType": "TRANSPORT",
                        "eventClassifierCode": "ACT",
                        "eventDateTime": "2023-06-10T19:00:00-07:00",
                        "carrierSpecificData": {
                            "internalEventCode": "AVD",
                            "internalEventLabel": "Vessel Departure",
                            "internalLocationCode": "USLAX",
                            "internalFacilityCode": "USLAXMETS",
                            "bookingExportVoyageReference": "0FTHSN1MA",
                            "transportationPhase": "Export",
                            "shipmentLocationType": "POL",
                            "transportCallSequenceTotal": 2,
                            "numberOfUnits": 12
                        },
                        "transportEventTypeCode": "DEPA",
                        "transportCall": {
                            "transportCallID": "50002856834",
                            "exportVoyageNumber": "0FTHSN1MA",
                            "transportCallSequenceNumber": 1,
                            "facilityCode": "ETS",
                            "facilityCodeListProvider": "SMDG",
                            "modeOfTransport": "VESSEL",
                            "location": {
                                "locationName": "LOS ANGELES, CA",
                                "latitude": "34.05222",
                                "longitude": "-118.24278",
                                "address": {
                                    "name": "389 TERMINAL ISLAND WAY",
                                    "street": "BERTHS 226-236",
                                    "postCode": "90731",
                                    "city": "LOS ANGELES",
                                    "country": "UNITED STATES"
                                }
                            },
                            "vessel": {
                                "vesselIMONumber": "9850848",
                                "vesselName": "EVER FOND",
                                "vesselFlag": "LR",
                                "vesselCallSignNumber": "5LCS5",
                                "vesselOperatorCarrierCode": "EMC"
                            }
                        },
                        "documentReferences": [{
                            "documentReferenceType": "BKG",
                            "documentReferenceValue": "401f423b25b649a73b7b64f232d9a33efcdd1a788e0992edfd8c48449f927dce"
                        }],
                        "references": [{"referenceType": "EQ", "referenceValue": "APZU3856920"}, {
                            "referenceType": "EQ",
                            "referenceValue": "APZU3936760"
                        }, {"referenceType": "EQ", "referenceValue": "CAIU3707093"}, {
                            "referenceType": "EQ",
                            "referenceValue": "CMAU0323116"
                        }, {"referenceType": "EQ", "referenceValue": "CMAU0875630"}, {
                            "referenceType": "EQ",
                            "referenceValue": "MAGU2239792"
                        }, {"referenceType": "EQ", "referenceValue": "TCLU7252194"}, {
                            "referenceType": "EQ",
                            "referenceValue": "TEMU0227469"
                        }, {"referenceType": "EQ", "referenceValue": "TEMU3240783"}, {
                            "referenceType": "EQ",
                            "referenceValue": "TLLU2806305"
                        }, {"referenceType": "EQ", "referenceValue": "TRHU3662231"}, {
                            "referenceType": "EQ",
                            "referenceValue": "TRLU9614964"
                        }],
                        "equipmentReference": "CMAU0875630"
                    }, {
                        "eventID": "4c539067de1eb9447564d1ccd6b454159dabcd0a",
                        "eventCreatedDateTime": "2023-06-11T05:40:13+00:00",
                        "eventType": "EQUIPMENT",
                        "eventClassifierCode": "ACT",
                        "eventDateTime": "2023-06-10T13:55:00-07:00",
                        "carrierSpecificData": {
                            "internalEventCode": "XOF",
                            "internalEventLabel": "Loaded on board",
                            "internalLocationCode": "USLAX",
                            "internalFacilityCode": "USLAXMETS",
                            "transportationPhase": "Export"
                        },
                        "transportCall": {
                            "transportCallID": "8e51cc6b-a472-481c-bf09-7f1f285ebcf7",
                            "exportVoyageNumber": "0FTHSN1MA",
                            "facilityCode": "ETS",
                            "facilityCodeListProvider": "SMDG",
                            "modeOfTransport": "VESSEL",
                            "location": {
                                "locationName": "LOS ANGELES, CA",
                                "latitude": "34.05222",
                                "longitude": "-118.24278",
                                "address": {
                                    "name": "389 TERMINAL ISLAND WAY",
                                    "street": "BERTHS 226-236",
                                    "postCode": "90731",
                                    "city": "LOS ANGELES",
                                    "country": "UNITED STATES"
                                }
                            },
                            "vessel": {
                                "vesselIMONumber": "9850848",
                                "vesselName": "EVER FOND",
                                "vesselFlag": "LR",
                                "vesselCallSignNumber": "5LCS5",
                                "vesselOperatorCarrierCode": "EMC"
                            }
                        },
                        "documentReferences": [{
                            "documentReferenceType": "BKG",
                            "documentReferenceValue": "401f423b25b649a73b7b64f232d9a33efcdd1a788e0992edfd8c48449f927dce"
                        }],
                        "equipmentEventTypeCode": "LOAD",
                        "equipmentReference": "CMAU0875630",
                        "ISOEquipmentCode": "22G1",
                        "emptyIndicatorCode": "LADEN",
                        "isoequipmentCode": "22G1"
                    }, {
                        "eventID": "5ab74fb0f8539451a929adb212dacb7c363d8089",
                        "eventCreatedDateTime": "2023-05-30T20:28:34+00:00",
                        "eventType": "EQUIPMENT",
                        "eventClassifierCode": "ACT",
                        "eventDateTime": "2023-05-30T13:11:00-07:00",
                        "carrierSpecificData": {
                            "internalEventCode": "XRX",
                            "internalEventLabel": "Gate in at Port terminal",
                            "internalLocationCode": "USLAX",
                            "internalFacilityCode": "USLAXMETS",
                            "transportationPhase": "Export"
                        },
                        "transportCall": {
                            "transportCallID": "d0c619dd-909d-42f0-8150-d7ba08a3ba99",
                            "facilityCode": "ETS",
                            "facilityCodeListProvider": "SMDG",
                            "modeOfTransport": "TRUCK",
                            "location": {
                                "locationName": "LOS ANGELES, CA",
                                "latitude": "34.05222",
                                "longitude": "-118.24278",
                                "address": {
                                    "name": "389 TERMINAL ISLAND WAY",
                                    "street": "BERTHS 226-236",
                                    "postCode": "90731",
                                    "city": "LOS ANGELES",
                                    "country": "UNITED STATES"
                                }
                            }
                        },
                        "documentReferences": [{
                            "documentReferenceType": "BKG",
                            "documentReferenceValue": "401f423b25b649a73b7b64f232d9a33efcdd1a788e0992edfd8c48449f927dce"
                        }],
                        "equipmentEventTypeCode": "GTIN",
                        "equipmentReference": "CMAU0875630",
                        "ISOEquipmentCode": "22G1",
                        "emptyIndicatorCode": "LADEN",
                        "isoequipmentCode": "22G1"
                    }, {
                        "eventID": "09f632cacc68fb234ea663296a9953b03bb72aa3",
                        "eventCreatedDateTime": "2023-05-25T20:47:17+00:00",
                        "eventType": "EQUIPMENT",
                        "eventClassifierCode": "ACT",
                        "eventDateTime": "2023-05-25T13:36:00-07:00",
                        "carrierSpecificData": {
                            "internalEventCode": "MOS",
                            "internalEventLabel": "Empty Picked-up at Depot",
                            "internalLocationCode": "USLAX",
                            "internalFacilityCode": "USLAXSRIO",
                            "transportationPhase": "Export"
                        },
                        "transportCall": {
                            "transportCallID": "9364b0db-4db1-403b-b5fc-bb34b70b799f",
                            "modeOfTransport": "TRUCK",
                            "location": {
                                "locationName": "LOS ANGELES, CA",
                                "latitude": "34.05222",
                                "longitude": "-118.24278",
                                "address": {
                                    "name": "SUCKOW ROAD",
                                    "postCode": "93516",
                                    "city": "LOS ANGELES",
                                    "country": "UNITED STATES"
                                }
                            }
                        },
                        "documentReferences": [{
                            "documentReferenceType": "BKG",
                            "documentReferenceValue": "401f423b25b649a73b7b64f232d9a33efcdd1a788e0992edfd8c48449f927dce"
                        }],
                        "equipmentEventTypeCode": "GTOT",
                        "equipmentReference": "CMAU0875630",
                        "ISOEquipmentCode": "22G1",
                        "emptyIndicatorCode": "EMPTY",
                        "isoequipmentCode": "22G1"
                    }]
                }, {
                    "containerRef": "APZU3936760", "equipmentSize": "22G1", "movement": [{
                        "eventID": "0e1e55da0ea7439dd7eb66f9988e8fa0f6a6c1a6",
                        "eventCreatedDateTime": "2023-06-13T02:33:07+00:00",
                        "eventType": "TRANSPORT",
                        "eventClassifierCode": "PLN",
                        "eventDateTime": "2023-07-18T04:18:00+08:00",
                        "carrierSpecificData": {
                            "internalEventCode": "PVA",
                            "internalEventLabel": "Vessel Arrival",
                            "internalLocationCode": "CNSHK",
                            "internalFacilityCode": "CNSHKDSCT",
                            "bookingExportVoyageReference": "0FTHSN1MA",
                            "transportationPhase": "Import",
                            "shipmentLocationType": "POD",
                            "transportCallSequenceTotal": 2,
                            "numberOfUnits": 12
                        },
                        "transportEventTypeCode": "ARRI",
                        "transportCall": {
                            "transportCallID": "50002857703",
                            "importVoyageNumber": "0FTHSN1MA",
                            "transportCallSequenceNumber": 2,
                            "facilityCode": "SCT",
                            "facilityCodeListProvider": "SMDG",
                            "modeOfTransport": "VESSEL",
                            "location": {
                                "locationName": "SHEKOU",
                                "latitude": "22.49639",
                                "longitude": "113.92",
                                "address": {
                                    "name": "JETTY THREE, HARBOUR ROAD,",
                                    "street": ".",
                                    "city": "SHEKOU",
                                    "country": "CHINA"
                                }
                            },
                            "vessel": {
                                "vesselIMONumber": "9850848",
                                "vesselName": "EVER FOND",
                                "vesselFlag": "LR",
                                "vesselCallSignNumber": "5LCS5",
                                "vesselOperatorCarrierCode": "EMC"
                            }
                        },
                        "documentReferences": [{
                            "documentReferenceType": "BKG",
                            "documentReferenceValue": "401f423b25b649a73b7b64f232d9a33efcdd1a788e0992edfd8c48449f927dce"
                        }],
                        "references": [{"referenceType": "EQ", "referenceValue": "APZU3856920"}, {
                            "referenceType": "EQ",
                            "referenceValue": "APZU3936760"
                        }, {"referenceType": "EQ", "referenceValue": "CAIU3707093"}, {
                            "referenceType": "EQ",
                            "referenceValue": "CMAU0323116"
                        }, {"referenceType": "EQ", "referenceValue": "CMAU0875630"}, {
                            "referenceType": "EQ",
                            "referenceValue": "MAGU2239792"
                        }, {"referenceType": "EQ", "referenceValue": "TCLU7252194"}, {
                            "referenceType": "EQ",
                            "referenceValue": "TEMU0227469"
                        }, {"referenceType": "EQ", "referenceValue": "TEMU3240783"}, {
                            "referenceType": "EQ",
                            "referenceValue": "TLLU2806305"
                        }, {"referenceType": "EQ", "referenceValue": "TRHU3662231"}, {
                            "referenceType": "EQ",
                            "referenceValue": "TRLU9614964"
                        }],
                        "equipmentReference": "APZU3936760"
                    }, {
                        "eventID": "91c2c128b8913862789f84fc9674abe5064d09f7",
                        "eventCreatedDateTime": "2023-06-13T02:33:07+00:00",
                        "eventType": "TRANSPORT",
                        "eventClassifierCode": "PLN",
                        "eventDateTime": "2023-06-11T06:27:00-07:00",
                        "carrierSpecificData": {
                            "internalEventCode": "PVD",
                            "internalEventLabel": "Vessel Departure",
                            "internalLocationCode": "USLAX",
                            "internalFacilityCode": "USLAXMETS",
                            "bookingExportVoyageReference": "0FTHSN1MA",
                            "transportationPhase": "Export",
                            "shipmentLocationType": "POL",
                            "transportCallSequenceTotal": 2,
                            "numberOfUnits": 12
                        },
                        "transportEventTypeCode": "DEPA",
                        "transportCall": {
                            "transportCallID": "50002856834",
                            "exportVoyageNumber": "0FTHSN1MA",
                            "transportCallSequenceNumber": 1,
                            "facilityCode": "ETS",
                            "facilityCodeListProvider": "SMDG",
                            "modeOfTransport": "VESSEL",
                            "location": {
                                "locationName": "LOS ANGELES, CA",
                                "latitude": "34.05222",
                                "longitude": "-118.24278",
                                "address": {
                                    "name": "389 TERMINAL ISLAND WAY",
                                    "street": "BERTHS 226-236",
                                    "postCode": "90731",
                                    "city": "LOS ANGELES",
                                    "country": "UNITED STATES"
                                }
                            },
                            "vessel": {
                                "vesselIMONumber": "9850848",
                                "vesselName": "EVER FOND",
                                "vesselFlag": "LR",
                                "vesselCallSignNumber": "5LCS5",
                                "vesselOperatorCarrierCode": "EMC"
                            }
                        },
                        "documentReferences": [{
                            "documentReferenceType": "BKG",
                            "documentReferenceValue": "401f423b25b649a73b7b64f232d9a33efcdd1a788e0992edfd8c48449f927dce"
                        }],
                        "references": [{"referenceType": "EQ", "referenceValue": "APZU3856920"}, {
                            "referenceType": "EQ",
                            "referenceValue": "APZU3936760"
                        }, {"referenceType": "EQ", "referenceValue": "CAIU3707093"}, {
                            "referenceType": "EQ",
                            "referenceValue": "CMAU0323116"
                        }, {"referenceType": "EQ", "referenceValue": "CMAU0875630"}, {
                            "referenceType": "EQ",
                            "referenceValue": "MAGU2239792"
                        }, {"referenceType": "EQ", "referenceValue": "TCLU7252194"}, {
                            "referenceType": "EQ",
                            "referenceValue": "TEMU0227469"
                        }, {"referenceType": "EQ", "referenceValue": "TEMU3240783"}, {
                            "referenceType": "EQ",
                            "referenceValue": "TLLU2806305"
                        }, {"referenceType": "EQ", "referenceValue": "TRHU3662231"}, {
                            "referenceType": "EQ",
                            "referenceValue": "TRLU9614964"
                        }],
                        "equipmentReference": "APZU3936760"
                    }, {
                        "eventID": "93be2a319f6bb52aa06bbcd65827c340674e488b",
                        "eventCreatedDateTime": "2023-06-11T03:04:05+00:00",
                        "eventType": "TRANSPORT",
                        "eventClassifierCode": "ACT",
                        "eventDateTime": "2023-06-10T19:00:00-07:00",
                        "carrierSpecificData": {
                            "internalEventCode": "AVD",
                            "internalEventLabel": "Vessel Departure",
                            "internalLocationCode": "USLAX",
                            "internalFacilityCode": "USLAXMETS",
                            "bookingExportVoyageReference": "0FTHSN1MA",
                            "transportationPhase": "Export",
                            "shipmentLocationType": "POL",
                            "transportCallSequenceTotal": 2,
                            "numberOfUnits": 12
                        },
                        "transportEventTypeCode": "DEPA",
                        "transportCall": {
                            "transportCallID": "50002856834",
                            "exportVoyageNumber": "0FTHSN1MA",
                            "transportCallSequenceNumber": 1,
                            "facilityCode": "ETS",
                            "facilityCodeListProvider": "SMDG",
                            "modeOfTransport": "VESSEL",
                            "location": {
                                "locationName": "LOS ANGELES, CA",
                                "latitude": "34.05222",
                                "longitude": "-118.24278",
                                "address": {
                                    "name": "389 TERMINAL ISLAND WAY",
                                    "street": "BERTHS 226-236",
                                    "postCode": "90731",
                                    "city": "LOS ANGELES",
                                    "country": "UNITED STATES"
                                }
                            },
                            "vessel": {
                                "vesselIMONumber": "9850848",
                                "vesselName": "EVER FOND",
                                "vesselFlag": "LR",
                                "vesselCallSignNumber": "5LCS5",
                                "vesselOperatorCarrierCode": "EMC"
                            }
                        },
                        "documentReferences": [{
                            "documentReferenceType": "BKG",
                            "documentReferenceValue": "401f423b25b649a73b7b64f232d9a33efcdd1a788e0992edfd8c48449f927dce"
                        }],
                        "references": [{"referenceType": "EQ", "referenceValue": "APZU3856920"}, {
                            "referenceType": "EQ",
                            "referenceValue": "APZU3936760"
                        }, {"referenceType": "EQ", "referenceValue": "CAIU3707093"}, {
                            "referenceType": "EQ",
                            "referenceValue": "CMAU0323116"
                        }, {"referenceType": "EQ", "referenceValue": "CMAU0875630"}, {
                            "referenceType": "EQ",
                            "referenceValue": "MAGU2239792"
                        }, {"referenceType": "EQ", "referenceValue": "TCLU7252194"}, {
                            "referenceType": "EQ",
                            "referenceValue": "TEMU0227469"
                        }, {"referenceType": "EQ", "referenceValue": "TEMU3240783"}, {
                            "referenceType": "EQ",
                            "referenceValue": "TLLU2806305"
                        }, {"referenceType": "EQ", "referenceValue": "TRHU3662231"}, {
                            "referenceType": "EQ",
                            "referenceValue": "TRLU9614964"
                        }],
                        "equipmentReference": "APZU3936760"
                    }, {
                        "eventID": "2f831326693e0eed455ee597c24ac55baed47957",
                        "eventCreatedDateTime": "2023-06-11T05:39:32+00:00",
                        "eventType": "EQUIPMENT",
                        "eventClassifierCode": "ACT",
                        "eventDateTime": "2023-06-10T13:47:00-07:00",
                        "carrierSpecificData": {
                            "internalEventCode": "XOF",
                            "internalEventLabel": "Loaded on board",
                            "internalLocationCode": "USLAX",
                            "internalFacilityCode": "USLAXMETS",
                            "transportationPhase": "Export"
                        },
                        "transportCall": {
                            "transportCallID": "f0fb0e1c-2b10-408f-a931-370ad3444ff4",
                            "exportVoyageNumber": "0FTHSN1MA",
                            "facilityCode": "ETS",
                            "facilityCodeListProvider": "SMDG",
                            "modeOfTransport": "VESSEL",
                            "location": {
                                "locationName": "LOS ANGELES, CA",
                                "latitude": "34.05222",
                                "longitude": "-118.24278",
                                "address": {
                                    "name": "389 TERMINAL ISLAND WAY",
                                    "street": "BERTHS 226-236",
                                    "postCode": "90731",
                                    "city": "LOS ANGELES",
                                    "country": "UNITED STATES"
                                }
                            },
                            "vessel": {
                                "vesselIMONumber": "9850848",
                                "vesselName": "EVER FOND",
                                "vesselFlag": "LR",
                                "vesselCallSignNumber": "5LCS5",
                                "vesselOperatorCarrierCode": "EMC"
                            }
                        },
                        "documentReferences": [{
                            "documentReferenceType": "BKG",
                            "documentReferenceValue": "401f423b25b649a73b7b64f232d9a33efcdd1a788e0992edfd8c48449f927dce"
                        }],
                        "equipmentEventTypeCode": "LOAD",
                        "equipmentReference": "APZU3936760",
                        "ISOEquipmentCode": "22G1",
                        "emptyIndicatorCode": "LADEN",
                        "isoequipmentCode": "22G1"
                    }, {
                        "eventID": "8faabe5f9038f341136611a99c47737af3eabfcf",
                        "eventCreatedDateTime": "2023-05-30T20:28:34+00:00",
                        "eventType": "EQUIPMENT",
                        "eventClassifierCode": "ACT",
                        "eventDateTime": "2023-05-30T13:06:00-07:00",
                        "carrierSpecificData": {
                            "internalEventCode": "XRX",
                            "internalEventLabel": "Gate in at Port terminal",
                            "internalLocationCode": "USLAX",
                            "internalFacilityCode": "USLAXMETS",
                            "transportationPhase": "Export"
                        },
                        "transportCall": {
                            "transportCallID": "7df64495-4e81-459a-8aef-6eb09ee20c14",
                            "facilityCode": "ETS",
                            "facilityCodeListProvider": "SMDG",
                            "modeOfTransport": "TRUCK",
                            "location": {
                                "locationName": "LOS ANGELES, CA",
                                "latitude": "34.05222",
                                "longitude": "-118.24278",
                                "address": {
                                    "name": "389 TERMINAL ISLAND WAY",
                                    "street": "BERTHS 226-236",
                                    "postCode": "90731",
                                    "city": "LOS ANGELES",
                                    "country": "UNITED STATES"
                                }
                            }
                        },
                        "documentReferences": [{
                            "documentReferenceType": "BKG",
                            "documentReferenceValue": "401f423b25b649a73b7b64f232d9a33efcdd1a788e0992edfd8c48449f927dce"
                        }],
                        "equipmentEventTypeCode": "GTIN",
                        "equipmentReference": "APZU3936760",
                        "ISOEquipmentCode": "22G1",
                        "emptyIndicatorCode": "LADEN",
                        "isoequipmentCode": "22G1"
                    }, {
                        "eventID": "81013c35b1e69a3fc39489e7b041af3ef50f21e7",
                        "eventCreatedDateTime": "2023-05-25T21:46:51+00:00",
                        "eventType": "EQUIPMENT",
                        "eventClassifierCode": "ACT",
                        "eventDateTime": "2023-05-25T14:30:00-07:00",
                        "carrierSpecificData": {
                            "internalEventCode": "MOS",
                            "internalEventLabel": "Empty Picked-up at Depot",
                            "internalLocationCode": "USLAX",
                            "internalFacilityCode": "USLAXSRIO",
                            "transportationPhase": "Export"
                        },
                        "transportCall": {
                            "transportCallID": "c4868fc0-6ed9-4848-9eea-7bda3c5017b3",
                            "modeOfTransport": "TRUCK",
                            "location": {
                                "locationName": "LOS ANGELES, CA",
                                "latitude": "34.05222",
                                "longitude": "-118.24278",
                                "address": {
                                    "name": "SUCKOW ROAD",
                                    "postCode": "93516",
                                    "city": "LOS ANGELES",
                                    "country": "UNITED STATES"
                                }
                            }
                        },
                        "documentReferences": [{
                            "documentReferenceType": "BKG",
                            "documentReferenceValue": "401f423b25b649a73b7b64f232d9a33efcdd1a788e0992edfd8c48449f927dce"
                        }],
                        "equipmentEventTypeCode": "GTOT",
                        "equipmentReference": "APZU3936760",
                        "ISOEquipmentCode": "22G1",
                        "emptyIndicatorCode": "EMPTY",
                        "isoequipmentCode": "22G1"
                    }]
                }], "shipmentRef": "NAM6249215"
            }]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.initLanguage()
        if (options.showSearch) {
            this.setData({
                showSearch: false
            })
        }
        if (options.str) {
            this.setData({
                shipmentRef: options.str
            })
            this.getHuoGuiResult()
        }
    },

    onShow: function () {
        this.setData({
            searchHis: wx.getStorageSync('trackSearchHis')
        })
    },

    initLanguage() {
        //获取当前小程序语言版本所对应的字典变量
        var lang = languageUtil.languageVersion()
        lang.lang.page.queryRes.language = lang.lang.page.langue
        wx.setNavigationBarTitle({
            title: lang.lang.page.queryRes.topTitle,
        })
        this.setData({
            languageContent: lang.lang.page.queryRes,
            verifyInfo: lang.lang.page.verifyInfo
        })
    },

    deleteValue() {
        this.setData({
            shipmentRef: '',
            showRemind: true,
            huiguiType: 1
        })
    },

    changeHuoguiValue(e) {
        //去掉空格和大写问题
        let value = e.detail.value.toUpperCase()
        let regvalue = value.trim()
        this.setData({
            shipmentRef: value
        })
        if (!value || value.replace(/\s*/g, "") === '') {
            this.setData({
                showRemind: true,
                huiguiType: 1
            })
            return
        }
        var reg = /^([ ]*[A-z0-9]+([\,\，]*)){0,3}$/;
        // 不包含，类型的数据
        if (!reg.test(regvalue)) {
            this.setData({
                // huoGuiValue: value,
                showRemind: true,
                huiguiType: value.split(',').length > 3 ? 3 : 2
            })
            return
        }
        const value2 = (value.substr(value.length - 1, 1) === ',' || value.substr(value.length - 1, 1) === '，') ? value.substr(0, value.length - 1) : value
        if (value2.split(',').length >= 2 && value2.split(',').length <= 3) {
            const arr = value2.split(',').map(item => item.trim())
            var newArr = arr.filter(function (value, index, self) {
                return self.indexOf(value) === index;
            });
            if (newArr.length !== arr.length) {
                this.setData({
                    showRemind: true,
                    huiguiType: 4
                })
                return
            }
        }
        this.setData({
            showRemind: false
        })
    },

    searchList() {
        const _this = this
        if (this.data.showRemind) {
            const remindMsg = this.data.huiguiType === 1 ? this.data.verifyInfo.required : this.data.huiguiType === 2 ? this.data.verifyInfo.gswx : this.data.huiguiType === 3 ? this.data.verifyInfo.more3 : this.data.verifyInfo.chongfu
            wx.showToast({
                title: remindMsg,
                icon: 'none',
                mask: true,
                duration: 3000
            })
            return
        }
        const huoguiStr = this.data.shipmentRef.replaceAll(' ', '')
        const huogui = (huoguiStr.charAt(huoguiStr.length - 1) === ',' ? huoguiStr.substr(0, huoguiStr.length - 2) : huoguiStr).split(',')
        var reg = /[A-Z]{3}[UJZ][0-9]{7}$/;
        const checkRes = []
        var serList = this.data.searchHis ? this.data.searchHis : []
        huogui.forEach(item => {
            var noSpaceItem = item.replace(/\s*/g, "")
            checkRes.push(reg.test(noSpaceItem))
            var idx = serList.indexOf(noSpaceItem)
            if (idx !== -1) {
                serList.splice(idx, 1)
                serList.unshift(noSpaceItem)
            } else if (noSpaceItem !== '' && idx === -1) {
                if (serList.length < 5) {
                    serList.unshift(noSpaceItem)
                } else {
                    serList.unshift(noSpaceItem)
                    serList.splice(serList.length - 1, 1)
                }
            }
        })
        if (checkRes.length > 1 && checkRes.filter(i => i).length !== checkRes.length) {
            wx.showToast({
                title: _this.data.verifyInfo.only,
                icon: 'none',
                mask: true,
                duration: 3000
            })
            return
        }
        let newHis = [...new Set(serList)]
        this.setData({
            searchHis: newHis
        })
        wx.setStorageSync('trackSearchHis', this.data.searchHis);
        if (wx.getStorageSync('partnerList')[0]?.code == '0002130568') {
            if (this.data.shipmentRef === 'NAM6249215') {
                let obj = {
                    shipmentRef: this.data.shipmentRef,
                    limit: 100,
                    businessPartnerCodes: []
                }
                if (wx.getStorageSync('access_token') && wx.getStorageSync('partnerList').length) {
                    obj.businessPartnerCodes = wx.getStorageSync('partnerList').map(i => i.code)
                }
                this.setData({
                    loading: true,
                    noData: false,
                    list: []
                })
                const data = this.data.codeData
                this.setData({
                    loading: false,
                    data: data
                })
                if (!data) {
                    this.setData({
                        noData: true
                    })
                    return
                }
                let containers = []
                // console.log("Order组件==>", containers, data.map(d => d.shipmentRef))
                this.setData({
                    results: data.map(d => d.shipmentRef)
                })
                data.forEach(route => {
                    // console.log("遍历data==>", route.data)
                    if (route.data && route.data.length) {
                        containers = containers.concat(route.data)
                    }
                })

                containers.forEach(item => {
                    const movements = JSON.parse(JSON.stringify(item.movement)).reverse()
                    item.movement = []

                    if (!wx.getStorageSync('access_token') && (item.containerRef === '' || item.equipmentSize === '')) {
                        this.setData({
                            noData: true
                        })
                    }

                    movements.forEach(move => {
                        if (!(move.eventClassifierCode === 'PLN' && dayjs(move.eventDateTime).isBefore(dayjs(), 'second')) && move.eventDateTime) {
                            item.movement.push(move)
                        }
                    })
                })

                const length = containers.filter(item => item.movement.length).length
                if (!length) {
                    this.setData({
                        noData: true
                    })
                }
                this.setData({
                    list: containers
                })
            }
            else if (this.data.shipmentRef === 'MAGU2239792') {

                  let  data=[
                        {
                            "data": [{
                                "containerRef": "MAGU2239792", "equipmentSize": "22G1", "movement": [{
                                    "eventID": "0e1e55da0ea7439dd7eb66f9988e8fa0f6a6c1a6",
                                    "eventCreatedDateTime": "2023-06-13T02:33:07+00:00",
                                    "eventType": "TRANSPORT",
                                    "eventClassifierCode": "PLN",
                                    "eventDateTime": "2023-07-18T04:18:00+08:00",
                                    "carrierSpecificData": {
                                        "internalEventCode": "PVA",
                                        "internalEventLabel": "Vessel Arrival",
                                        "internalLocationCode": "CNSHK",
                                        "internalFacilityCode": "CNSHKDSCT",
                                        "bookingExportVoyageReference": "0FTHSN1MA",
                                        "transportationPhase": "Import",
                                        "shipmentLocationType": "POD",
                                        "transportCallSequenceTotal": 2,
                                        "numberOfUnits": 12
                                    },
                                    "transportEventTypeCode": "ARRI",
                                    "transportCall": {
                                        "transportCallID": "50002857703",
                                        "importVoyageNumber": "0FTHSN1MA",
                                        "transportCallSequenceNumber": 2,
                                        "facilityCode": "SCT",
                                        "facilityCodeListProvider": "SMDG",
                                        "modeOfTransport": "VESSEL",
                                        "location": {
                                            "locationName": "SHEKOU",
                                            "latitude": "22.49639",
                                            "longitude": "113.92",
                                            "address": {
                                                "name": "JETTY THREE, HARBOUR ROAD,",
                                                "street": ".",
                                                "city": "SHEKOU",
                                                "country": "CHINA"
                                            }
                                        },
                                        "vessel": {
                                            "vesselIMONumber": "9850848",
                                            "vesselName": "EVER FOND",
                                            "vesselFlag": "LR",
                                            "vesselCallSignNumber": "5LCS5",
                                            "vesselOperatorCarrierCode": "EMC",
                                            "vesselOperatorCarrierCodeListProvider": "SMDG"
                                        }
                                    },
                                    "documentReferences": [{
                                        "documentReferenceType": "BKG",
                                        "documentReferenceValue": "401f423b25b649a73b7b64f232d9a33efcdd1a788e0992edfd8c48449f927dce"
                                    }],
                                    "references": [{"referenceType": "EQ", "referenceValue": "MAGU2239792"}],
                                    "equipmentReference": "MAGU2239792"
                                }, {
                                    "eventID": "91c2c128b8913862789f84fc9674abe5064d09f7",
                                    "eventCreatedDateTime": "2023-06-13T02:33:07+00:00",
                                    "eventType": "TRANSPORT",
                                    "eventClassifierCode": "PLN",
                                    "eventDateTime": "2023-06-11T06:27:00-07:00",
                                    "carrierSpecificData": {
                                        "internalEventCode": "PVD",
                                        "internalEventLabel": "Vessel Departure",
                                        "internalLocationCode": "USLAX",
                                        "internalFacilityCode": "USLAXMETS",
                                        "bookingExportVoyageReference": "0FTHSN1MA",
                                        "transportationPhase": "Export",
                                        "shipmentLocationType": "POL",
                                        "transportCallSequenceTotal": 2,
                                        "numberOfUnits": 12
                                    },
                                    "transportEventTypeCode": "DEPA",
                                    "transportCall": {
                                        "transportCallID": "50002856834",
                                        "exportVoyageNumber": "0FTHSN1MA",
                                        "transportCallSequenceNumber": 1,
                                        "facilityCode": "ETS",
                                        "facilityCodeListProvider": "SMDG",
                                        "modeOfTransport": "VESSEL",
                                        "location": {
                                            "locationName": "LOS ANGELES, CA",
                                            "latitude": "34.05222",
                                            "longitude": "-118.24278",
                                            "address": {
                                                "name": "389 TERMINAL ISLAND WAY",
                                                "street": "BERTHS 226-236",
                                                "postCode": "90731",
                                                "city": "LOS ANGELES",
                                                "country": "UNITED STATES"
                                            }
                                        },
                                        "vessel": {
                                            "vesselIMONumber": "9850848",
                                            "vesselName": "EVER FOND",
                                            "vesselFlag": "LR",
                                            "vesselCallSignNumber": "5LCS5",
                                            "vesselOperatorCarrierCode": "EMC",
                                            "vesselOperatorCarrierCodeListProvider": "SMDG"
                                        }
                                    },
                                    "documentReferences": [{
                                        "documentReferenceType": "BKG",
                                        "documentReferenceValue": "401f423b25b649a73b7b64f232d9a33efcdd1a788e0992edfd8c48449f927dce"
                                    }],
                                    "references": [{"referenceType": "EQ", "referenceValue": "MAGU2239792"}],
                                    "equipmentReference": "MAGU2239792"
                                }, {
                                    "eventID": "93be2a319f6bb52aa06bbcd65827c340674e488b",
                                    "eventCreatedDateTime": "2023-06-11T03:04:05+00:00",
                                    "eventType": "TRANSPORT",
                                    "eventClassifierCode": "ACT",
                                    "eventDateTime": "2023-06-10T19:00:00-07:00",
                                    "carrierSpecificData": {
                                        "internalEventCode": "AVD",
                                        "internalEventLabel": "Vessel Departure",
                                        "internalLocationCode": "USLAX",
                                        "internalFacilityCode": "USLAXMETS",
                                        "bookingExportVoyageReference": "0FTHSN1MA",
                                        "transportationPhase": "Export",
                                        "shipmentLocationType": "POL",
                                        "transportCallSequenceTotal": 2,
                                        "numberOfUnits": 12
                                    },
                                    "transportEventTypeCode": "DEPA",
                                    "transportCall": {
                                        "transportCallID": "50002856834",
                                        "exportVoyageNumber": "0FTHSN1MA",
                                        "transportCallSequenceNumber": 1,
                                        "facilityCode": "ETS",
                                        "facilityCodeListProvider": "SMDG",
                                        "modeOfTransport": "VESSEL",
                                        "location": {
                                            "locationName": "LOS ANGELES, CA",
                                            "latitude": "34.05222",
                                            "longitude": "-118.24278",
                                            "address": {
                                                "name": "389 TERMINAL ISLAND WAY",
                                                "street": "BERTHS 226-236",
                                                "postCode": "90731",
                                                "city": "LOS ANGELES",
                                                "country": "UNITED STATES"
                                            }
                                        },
                                        "vessel": {
                                            "vesselIMONumber": "9850848",
                                            "vesselName": "EVER FOND",
                                            "vesselFlag": "LR",
                                            "vesselCallSignNumber": "5LCS5",
                                            "vesselOperatorCarrierCode": "EMC",
                                            "vesselOperatorCarrierCodeListProvider": "SMDG"
                                        }
                                    },
                                    "documentReferences": [{
                                        "documentReferenceType": "BKG",
                                        "documentReferenceValue": "401f423b25b649a73b7b64f232d9a33efcdd1a788e0992edfd8c48449f927dce"
                                    }],
                                    "references": [{"referenceType": "EQ", "referenceValue": "MAGU2239792"}],
                                    "equipmentReference": "MAGU2239792"
                                }, {
                                    "eventID": "f5f848998f46aa4fc657c98318ae928ef7f3181a",
                                    "eventCreatedDateTime": "2023-06-11T05:40:14+00:00",
                                    "eventType": "EQUIPMENT",
                                    "eventClassifierCode": "ACT",
                                    "eventDateTime": "2023-06-10T13:55:00-07:00",
                                    "carrierSpecificData": {
                                        "internalEventCode": "XOF",
                                        "internalEventLabel": "Loaded on board",
                                        "internalLocationCode": "USLAX",
                                        "internalFacilityCode": "USLAXMETS",
                                        "transportationPhase": "Export"
                                    },
                                    "transportCall": {
                                        "transportCallID": "d6a28a49-9b82-48d5-be78-fee4629efa25",
                                        "exportVoyageNumber": "0FTHSN1MA",
                                        "facilityCode": "ETS",
                                        "facilityCodeListProvider": "SMDG",
                                        "modeOfTransport": "VESSEL",
                                        "location": {
                                            "locationName": "LOS ANGELES, CA",
                                            "latitude": "34.05222",
                                            "longitude": "-118.24278",
                                            "address": {
                                                "name": "389 TERMINAL ISLAND WAY",
                                                "street": "BERTHS 226-236",
                                                "postCode": "90731",
                                                "city": "LOS ANGELES",
                                                "country": "UNITED STATES"
                                            }
                                        },
                                        "vessel": {
                                            "vesselIMONumber": "9850848",
                                            "vesselName": "EVER FOND",
                                            "vesselFlag": "LR",
                                            "vesselCallSignNumber": "5LCS5",
                                            "vesselOperatorCarrierCode": "EMC",
                                            "vesselOperatorCarrierCodeListProvider": "SMDG"
                                        }
                                    },
                                    "documentReferences": [{
                                        "documentReferenceType": "BKG",
                                        "documentReferenceValue": "401f423b25b649a73b7b64f232d9a33efcdd1a788e0992edfd8c48449f927dce"
                                    }],
                                    "equipmentEventTypeCode": "LOAD",
                                    "equipmentReference": "MAGU2239792",
                                    "ISOEquipmentCode": "22G1",
                                    "emptyIndicatorCode": "LADEN",
                                    "isoequipmentCode": "22G1"
                                }, {
                                    "eventID": "bd25db5d947bb17bd01d3370f965bfefb2242228",
                                    "eventCreatedDateTime": "2023-05-30T18:48:02+00:00",
                                    "eventType": "EQUIPMENT",
                                    "eventClassifierCode": "ACT",
                                    "eventDateTime": "2023-05-30T11:18:00-07:00",
                                    "carrierSpecificData": {
                                        "internalEventCode": "XRX",
                                        "internalEventLabel": "Gate in at Port terminal",
                                        "internalLocationCode": "USLAX",
                                        "internalFacilityCode": "USLAXMETS",
                                        "transportationPhase": "Export"
                                    },
                                    "transportCall": {
                                        "transportCallID": "73cefbc4-1445-488b-abe7-d8c8ebd27413",
                                        "facilityCode": "ETS",
                                        "facilityCodeListProvider": "SMDG",
                                        "modeOfTransport": "TRUCK",
                                        "location": {
                                            "locationName": "LOS ANGELES, CA",
                                            "latitude": "34.05222",
                                            "longitude": "-118.24278",
                                            "address": {
                                                "name": "389 TERMINAL ISLAND WAY",
                                                "street": "BERTHS 226-236",
                                                "postCode": "90731",
                                                "city": "LOS ANGELES",
                                                "country": "UNITED STATES"
                                            }
                                        }
                                    },
                                    "documentReferences": [{
                                        "documentReferenceType": "BKG",
                                        "documentReferenceValue": "401f423b25b649a73b7b64f232d9a33efcdd1a788e0992edfd8c48449f927dce"
                                    }],
                                    "equipmentEventTypeCode": "GTIN",
                                    "equipmentReference": "MAGU2239792",
                                    "ISOEquipmentCode": "22G1",
                                    "emptyIndicatorCode": "LADEN",
                                    "isoequipmentCode": "22G1"
                                }, {
                                    "eventID": "bc2c62c5a8e89c405201a72409a6872208ff988b",
                                    "eventCreatedDateTime": "2023-05-24T08:34:00+00:00",
                                    "eventType": "EQUIPMENT",
                                    "eventClassifierCode": "ACT",
                                    "eventDateTime": "2023-05-23T23:40:00-07:00",
                                    "carrierSpecificData": {
                                        "internalEventCode": "MOS",
                                        "internalEventLabel": "Empty Picked-up at Depot",
                                        "internalLocationCode": "USLAX",
                                        "internalFacilityCode": "USLAXSRIO",
                                        "transportationPhase": "Export"
                                    },
                                    "transportCall": {
                                        "transportCallID": "e5c8ae95-afb0-4248-abc2-e3c463626dda",
                                        "modeOfTransport": "TRUCK",
                                        "location": {
                                            "locationName": "LOS ANGELES, CA",
                                            "latitude": "34.05222",
                                            "longitude": "-118.24278",
                                            "address": {
                                                "name": "SUCKOW ROAD",
                                                "postCode": "93516",
                                                "city": "LOS ANGELES",
                                                "country": "UNITED STATES"
                                            }
                                        }
                                    },
                                    "documentReferences": [{
                                        "documentReferenceType": "BKG",
                                        "documentReferenceValue": "401f423b25b649a73b7b64f232d9a33efcdd1a788e0992edfd8c48449f927dce"
                                    }],
                                    "equipmentEventTypeCode": "GTOT",
                                    "equipmentReference": "MAGU2239792",
                                    "ISOEquipmentCode": "22G1",
                                    "emptyIndicatorCode": "EMPTY",
                                    "isoequipmentCode": "22G1"
                                }]
                            }], "shipmentRef": "MAGU2239792"
                        }]
                let obj = {
                    shipmentRef: this.data.shipmentRef,
                    limit: 100,
                    businessPartnerCodes: []
                }
                if (wx.getStorageSync('access_token') && wx.getStorageSync('partnerList').length) {
                    obj.businessPartnerCodes = wx.getStorageSync('partnerList').map(i => i.code)
                }
                this.setData({
                    loading: true,
                    noData: false,
                    list: []
                })
                this.setData({
                    loading: false,
                    data: data
                })
                if (!data) {
                    this.setData({
                        noData: true
                    })
                    return
                }
                let containers = []
                // console.log("Order组件==>", containers, data.map(d => d.shipmentRef))
                this.setData({
                    results: data.map(d => d.shipmentRef)
                })
                data.forEach(route => {
                    // console.log("遍历data==>", route.data)
                    if (route.data && route.data.length) {
                        containers = containers.concat(route.data)
                    }
                })

                containers.forEach(item => {
                    const movements = JSON.parse(JSON.stringify(item.movement)).reverse()
                    item.movement = []

                    if (!wx.getStorageSync('access_token') && (item.containerRef === '' || item.equipmentSize === '')) {
                        this.setData({
                            noData: true
                        })
                    }

                    movements.forEach(move => {
                        if (!(move.eventClassifierCode === 'PLN' && dayjs(move.eventDateTime).isBefore(dayjs(), 'second')) && move.eventDateTime) {
                            item.movement.push(move)
                        }
                    })
                })

                const length = containers.filter(item => item.movement.length).length
                if (!length) {
                    this.setData({
                        noData: true
                    })
                }
                this.setData({
                    list: containers
                })            }
            else {
                this.setData({
                    noData: true,
                    loading: false,
                    list: [],
                    data: []
                })
            }

        } else {
            this.getHuoGuiResult()
        }


    },

    getHuoGuiResult() {
        let obj = {
            shipmentRef: this.data.shipmentRef,
            limit: 100,
            businessPartnerCodes: []
        }
        if (wx.getStorageSync('access_token') && wx.getStorageSync('partnerList').length) {
            obj.businessPartnerCodes = wx.getStorageSync('partnerList').map(i => i.code)
        }
        this.setData({
            loading: true,
            noData: false,
            list: []
        })
        //模拟数据0002130568
        if (wx.getStorageSync('partnerList')[0]?.code == '0002130568') {
            if (this.data.shipmentRef === 'NAM6249215') {
                this.setData({
                    loading: false,
                    data: this.data.codeData
                })
                const data = this.data.data;
                if (!data) {
                    this.setData({
                        noData: true
                    })
                    return
                }
                let containers = []
                // console.log("Order组件==>", containers, data.map(d => d.shipmentRef))
                this.setData({
                    results: data.map(d => d.shipmentRef)
                })
                data.forEach(route => {
                    // console.log("遍历data==>", route.data)
                    if (route.data && route.data.length) {
                        containers = containers.concat(route.data)
                    }
                })

                containers.forEach(item => {
                    const movements = JSON.parse(JSON.stringify(item.movement)).reverse()
                    item.movement = []

                    if (!wx.getStorageSync('access_token') && (item.containerRef === '' || item.equipmentSize === '')) {
                        this.setData({
                            noData: true
                        })
                    }

                    movements.forEach(move => {
                        if (!(move.eventClassifierCode === 'PLN' && dayjs(move.eventDateTime).isBefore(dayjs(), 'second')) && move.eventDateTime) {
                            item.movement.push(move)
                        }
                    })
                })

                const length = containers.filter(item => item.movement.length).length
                if (!length) {
                    this.setData({
                        noData: true
                    })
                }
                this.setData({
                    list: containers
                })
            }
           else if (this.data.shipmentRef === 'MAGU2239792') {
                this.setData({
                    loading: false,
                    data: [
                        {
                            "data": [{
                                "containerRef": "MAGU2239792", "equipmentSize": "22G1", "movement": [{
                                    "eventID": "0e1e55da0ea7439dd7eb66f9988e8fa0f6a6c1a6",
                                    "eventCreatedDateTime": "2023-06-13T02:33:07+00:00",
                                    "eventType": "TRANSPORT",
                                    "eventClassifierCode": "PLN",
                                    "eventDateTime": "2023-07-18T04:18:00+08:00",
                                    "carrierSpecificData": {
                                        "internalEventCode": "PVA",
                                        "internalEventLabel": "Vessel Arrival",
                                        "internalLocationCode": "CNSHK",
                                        "internalFacilityCode": "CNSHKDSCT",
                                        "bookingExportVoyageReference": "0FTHSN1MA",
                                        "transportationPhase": "Import",
                                        "shipmentLocationType": "POD",
                                        "transportCallSequenceTotal": 2,
                                        "numberOfUnits": 12
                                    },
                                    "transportEventTypeCode": "ARRI",
                                    "transportCall": {
                                        "transportCallID": "50002857703",
                                        "importVoyageNumber": "0FTHSN1MA",
                                        "transportCallSequenceNumber": 2,
                                        "facilityCode": "SCT",
                                        "facilityCodeListProvider": "SMDG",
                                        "modeOfTransport": "VESSEL",
                                        "location": {
                                            "locationName": "SHEKOU",
                                            "latitude": "22.49639",
                                            "longitude": "113.92",
                                            "address": {
                                                "name": "JETTY THREE, HARBOUR ROAD,",
                                                "street": ".",
                                                "city": "SHEKOU",
                                                "country": "CHINA"
                                            }
                                        },
                                        "vessel": {
                                            "vesselIMONumber": "9850848",
                                            "vesselName": "EVER FOND",
                                            "vesselFlag": "LR",
                                            "vesselCallSignNumber": "5LCS5",
                                            "vesselOperatorCarrierCode": "EMC",
                                            "vesselOperatorCarrierCodeListProvider": "SMDG"
                                        }
                                    },
                                    "documentReferences": [{
                                        "documentReferenceType": "BKG",
                                        "documentReferenceValue": "401f423b25b649a73b7b64f232d9a33efcdd1a788e0992edfd8c48449f927dce"
                                    }],
                                    "references": [{"referenceType": "EQ", "referenceValue": "MAGU2239792"}],
                                    "equipmentReference": "MAGU2239792"
                                }, {
                                    "eventID": "91c2c128b8913862789f84fc9674abe5064d09f7",
                                    "eventCreatedDateTime": "2023-06-13T02:33:07+00:00",
                                    "eventType": "TRANSPORT",
                                    "eventClassifierCode": "PLN",
                                    "eventDateTime": "2023-06-11T06:27:00-07:00",
                                    "carrierSpecificData": {
                                        "internalEventCode": "PVD",
                                        "internalEventLabel": "Vessel Departure",
                                        "internalLocationCode": "USLAX",
                                        "internalFacilityCode": "USLAXMETS",
                                        "bookingExportVoyageReference": "0FTHSN1MA",
                                        "transportationPhase": "Export",
                                        "shipmentLocationType": "POL",
                                        "transportCallSequenceTotal": 2,
                                        "numberOfUnits": 12
                                    },
                                    "transportEventTypeCode": "DEPA",
                                    "transportCall": {
                                        "transportCallID": "50002856834",
                                        "exportVoyageNumber": "0FTHSN1MA",
                                        "transportCallSequenceNumber": 1,
                                        "facilityCode": "ETS",
                                        "facilityCodeListProvider": "SMDG",
                                        "modeOfTransport": "VESSEL",
                                        "location": {
                                            "locationName": "LOS ANGELES, CA",
                                            "latitude": "34.05222",
                                            "longitude": "-118.24278",
                                            "address": {
                                                "name": "389 TERMINAL ISLAND WAY",
                                                "street": "BERTHS 226-236",
                                                "postCode": "90731",
                                                "city": "LOS ANGELES",
                                                "country": "UNITED STATES"
                                            }
                                        },
                                        "vessel": {
                                            "vesselIMONumber": "9850848",
                                            "vesselName": "EVER FOND",
                                            "vesselFlag": "LR",
                                            "vesselCallSignNumber": "5LCS5",
                                            "vesselOperatorCarrierCode": "EMC",
                                            "vesselOperatorCarrierCodeListProvider": "SMDG"
                                        }
                                    },
                                    "documentReferences": [{
                                        "documentReferenceType": "BKG",
                                        "documentReferenceValue": "401f423b25b649a73b7b64f232d9a33efcdd1a788e0992edfd8c48449f927dce"
                                    }],
                                    "references": [{"referenceType": "EQ", "referenceValue": "MAGU2239792"}],
                                    "equipmentReference": "MAGU2239792"
                                }, {
                                    "eventID": "93be2a319f6bb52aa06bbcd65827c340674e488b",
                                    "eventCreatedDateTime": "2023-06-11T03:04:05+00:00",
                                    "eventType": "TRANSPORT",
                                    "eventClassifierCode": "ACT",
                                    "eventDateTime": "2023-06-10T19:00:00-07:00",
                                    "carrierSpecificData": {
                                        "internalEventCode": "AVD",
                                        "internalEventLabel": "Vessel Departure",
                                        "internalLocationCode": "USLAX",
                                        "internalFacilityCode": "USLAXMETS",
                                        "bookingExportVoyageReference": "0FTHSN1MA",
                                        "transportationPhase": "Export",
                                        "shipmentLocationType": "POL",
                                        "transportCallSequenceTotal": 2,
                                        "numberOfUnits": 12
                                    },
                                    "transportEventTypeCode": "DEPA",
                                    "transportCall": {
                                        "transportCallID": "50002856834",
                                        "exportVoyageNumber": "0FTHSN1MA",
                                        "transportCallSequenceNumber": 1,
                                        "facilityCode": "ETS",
                                        "facilityCodeListProvider": "SMDG",
                                        "modeOfTransport": "VESSEL",
                                        "location": {
                                            "locationName": "LOS ANGELES, CA",
                                            "latitude": "34.05222",
                                            "longitude": "-118.24278",
                                            "address": {
                                                "name": "389 TERMINAL ISLAND WAY",
                                                "street": "BERTHS 226-236",
                                                "postCode": "90731",
                                                "city": "LOS ANGELES",
                                                "country": "UNITED STATES"
                                            }
                                        },
                                        "vessel": {
                                            "vesselIMONumber": "9850848",
                                            "vesselName": "EVER FOND",
                                            "vesselFlag": "LR",
                                            "vesselCallSignNumber": "5LCS5",
                                            "vesselOperatorCarrierCode": "EMC",
                                            "vesselOperatorCarrierCodeListProvider": "SMDG"
                                        }
                                    },
                                    "documentReferences": [{
                                        "documentReferenceType": "BKG",
                                        "documentReferenceValue": "401f423b25b649a73b7b64f232d9a33efcdd1a788e0992edfd8c48449f927dce"
                                    }],
                                    "references": [{"referenceType": "EQ", "referenceValue": "MAGU2239792"}],
                                    "equipmentReference": "MAGU2239792"
                                }, {
                                    "eventID": "f5f848998f46aa4fc657c98318ae928ef7f3181a",
                                    "eventCreatedDateTime": "2023-06-11T05:40:14+00:00",
                                    "eventType": "EQUIPMENT",
                                    "eventClassifierCode": "ACT",
                                    "eventDateTime": "2023-06-10T13:55:00-07:00",
                                    "carrierSpecificData": {
                                        "internalEventCode": "XOF",
                                        "internalEventLabel": "Loaded on board",
                                        "internalLocationCode": "USLAX",
                                        "internalFacilityCode": "USLAXMETS",
                                        "transportationPhase": "Export"
                                    },
                                    "transportCall": {
                                        "transportCallID": "d6a28a49-9b82-48d5-be78-fee4629efa25",
                                        "exportVoyageNumber": "0FTHSN1MA",
                                        "facilityCode": "ETS",
                                        "facilityCodeListProvider": "SMDG",
                                        "modeOfTransport": "VESSEL",
                                        "location": {
                                            "locationName": "LOS ANGELES, CA",
                                            "latitude": "34.05222",
                                            "longitude": "-118.24278",
                                            "address": {
                                                "name": "389 TERMINAL ISLAND WAY",
                                                "street": "BERTHS 226-236",
                                                "postCode": "90731",
                                                "city": "LOS ANGELES",
                                                "country": "UNITED STATES"
                                            }
                                        },
                                        "vessel": {
                                            "vesselIMONumber": "9850848",
                                            "vesselName": "EVER FOND",
                                            "vesselFlag": "LR",
                                            "vesselCallSignNumber": "5LCS5",
                                            "vesselOperatorCarrierCode": "EMC",
                                            "vesselOperatorCarrierCodeListProvider": "SMDG"
                                        }
                                    },
                                    "documentReferences": [{
                                        "documentReferenceType": "BKG",
                                        "documentReferenceValue": "401f423b25b649a73b7b64f232d9a33efcdd1a788e0992edfd8c48449f927dce"
                                    }],
                                    "equipmentEventTypeCode": "LOAD",
                                    "equipmentReference": "MAGU2239792",
                                    "ISOEquipmentCode": "22G1",
                                    "emptyIndicatorCode": "LADEN",
                                    "isoequipmentCode": "22G1"
                                }, {
                                    "eventID": "bd25db5d947bb17bd01d3370f965bfefb2242228",
                                    "eventCreatedDateTime": "2023-05-30T18:48:02+00:00",
                                    "eventType": "EQUIPMENT",
                                    "eventClassifierCode": "ACT",
                                    "eventDateTime": "2023-05-30T11:18:00-07:00",
                                    "carrierSpecificData": {
                                        "internalEventCode": "XRX",
                                        "internalEventLabel": "Gate in at Port terminal",
                                        "internalLocationCode": "USLAX",
                                        "internalFacilityCode": "USLAXMETS",
                                        "transportationPhase": "Export"
                                    },
                                    "transportCall": {
                                        "transportCallID": "73cefbc4-1445-488b-abe7-d8c8ebd27413",
                                        "facilityCode": "ETS",
                                        "facilityCodeListProvider": "SMDG",
                                        "modeOfTransport": "TRUCK",
                                        "location": {
                                            "locationName": "LOS ANGELES, CA",
                                            "latitude": "34.05222",
                                            "longitude": "-118.24278",
                                            "address": {
                                                "name": "389 TERMINAL ISLAND WAY",
                                                "street": "BERTHS 226-236",
                                                "postCode": "90731",
                                                "city": "LOS ANGELES",
                                                "country": "UNITED STATES"
                                            }
                                        }
                                    },
                                    "documentReferences": [{
                                        "documentReferenceType": "BKG",
                                        "documentReferenceValue": "401f423b25b649a73b7b64f232d9a33efcdd1a788e0992edfd8c48449f927dce"
                                    }],
                                    "equipmentEventTypeCode": "GTIN",
                                    "equipmentReference": "MAGU2239792",
                                    "ISOEquipmentCode": "22G1",
                                    "emptyIndicatorCode": "LADEN",
                                    "isoequipmentCode": "22G1"
                                }, {
                                    "eventID": "bc2c62c5a8e89c405201a72409a6872208ff988b",
                                    "eventCreatedDateTime": "2023-05-24T08:34:00+00:00",
                                    "eventType": "EQUIPMENT",
                                    "eventClassifierCode": "ACT",
                                    "eventDateTime": "2023-05-23T23:40:00-07:00",
                                    "carrierSpecificData": {
                                        "internalEventCode": "MOS",
                                        "internalEventLabel": "Empty Picked-up at Depot",
                                        "internalLocationCode": "USLAX",
                                        "internalFacilityCode": "USLAXSRIO",
                                        "transportationPhase": "Export"
                                    },
                                    "transportCall": {
                                        "transportCallID": "e5c8ae95-afb0-4248-abc2-e3c463626dda",
                                        "modeOfTransport": "TRUCK",
                                        "location": {
                                            "locationName": "LOS ANGELES, CA",
                                            "latitude": "34.05222",
                                            "longitude": "-118.24278",
                                            "address": {
                                                "name": "SUCKOW ROAD",
                                                "postCode": "93516",
                                                "city": "LOS ANGELES",
                                                "country": "UNITED STATES"
                                            }
                                        }
                                    },
                                    "documentReferences": [{
                                        "documentReferenceType": "BKG",
                                        "documentReferenceValue": "401f423b25b649a73b7b64f232d9a33efcdd1a788e0992edfd8c48449f927dce"
                                    }],
                                    "equipmentEventTypeCode": "GTOT",
                                    "equipmentReference": "MAGU2239792",
                                    "ISOEquipmentCode": "22G1",
                                    "emptyIndicatorCode": "EMPTY",
                                    "isoequipmentCode": "22G1"
                                }]
                            }], "shipmentRef": "MAGU2239792"
                        }]
                })
                const data = this.data.data;
                if (!data) {
                    this.setData({
                        noData: true
                    })
                    return
                }
                let containers = []
                // console.log("Order组件==>", containers, data.map(d => d.shipmentRef))
                this.setData({
                    results: data.map(d => d.shipmentRef)
                })
                data.forEach(route => {
                    // console.log("遍历data==>", route.data)
                    if (route.data && route.data.length) {
                        containers = containers.concat(route.data)
                    }
                })

                containers.forEach(item => {
                    const movements = JSON.parse(JSON.stringify(item.movement)).reverse()
                    item.movement = []

                    if (!wx.getStorageSync('access_token') && (item.containerRef === '' || item.equipmentSize === '')) {
                        this.setData({
                            noData: true
                        })
                    }

                    movements.forEach(move => {
                        if (!(move.eventClassifierCode === 'PLN' && dayjs(move.eventDateTime).isBefore(dayjs(), 'second')) && move.eventDateTime) {
                            item.movement.push(move)
                        }
                    })
                })

                const length = containers.filter(item => item.movement.length).length
                if (!length) {
                    this.setData({
                        noData: true
                    })
                }
                this.setData({
                    list: containers
                })
            }
            else {
                this.setData({
                    noData: true,
                    loading: false,
                    list: [],
                    data: []
                })
            }
        } else {
            shipmentTracking(obj).then(res => {
                this.setData({
                    loading: false,
                    data: res.data
                })
                // console.log('data', this.data.data, JSON.stringify(res.data))
                const data = res.data;
                if (!data) {
                    this.setData({
                        noData: true
                    })
                    return
                }
                let containers = []
                // console.log("Order组件==>", containers, data.map(d => d.shipmentRef))
                this.setData({
                    results: data.map(d => d.shipmentRef)
                })

                console.log('results', this.data.results)
                data.forEach(route => {
                    // console.log("遍历data==>", route.data)
                    if (route.data && route.data.length) {
                        containers = containers.concat(route.data)
                    }
                })

                containers.forEach(item => {
                    const movements = JSON.parse(JSON.stringify(item.movement)).reverse()
                    item.movement = []

                    if (!wx.getStorageSync('access_token') && (item.containerRef === '' || item.equipmentSize === '')) {
                        this.setData({
                            noData: true
                        })
                    }

                    movements.forEach(move => {
                        if (!(move.eventClassifierCode === 'PLN' && dayjs(move.eventDateTime).isBefore(dayjs(), 'second')) && move.eventDateTime) {
                            item.movement.push(move)
                        }
                    })
                })

                const length = containers.filter(item => item.movement.length).length
                if (!length) {
                    this.setData({
                        noData: true
                    })
                }
                console.log('containers', containers)
                this.setData({
                    list: containers
                })
            })
        }

    },
    showSearchHis() {
        this.setData({
            showHis: true
        })
    },

    hideSearchHis() {
        this.setData({
            showHis: false
        })
    },

    chooseHis(e) {
        var reg = /[A-Z]{3}[UJZ][0-9]{7}$/;
        var testInput = reg.test(e.detail);
        var testHave = false;
        const huoguiStr = this.data.shipmentRef.replaceAll(' ', '')
        const huogui = (huoguiStr.charAt(huoguiStr.length - 1) === ',' ? huoguiStr.substr(0, huoguiStr.length - 2) : huoguiStr).split(',')
        if (huoguiStr.includes(e.detail)) return
        huogui.forEach(item => {
            if (reg.test(item.trim())) {
                testHave = true
            } else {
                testHave = false
            }
        })
        if (testInput && testHave) {
            let newStr = this.data.shipmentRef + ',' + e.detail
            this.setData({
                shipmentRef: newStr,
                showRemind: false
            })
        } else {
            this.setData({
                shipmentRef: e.detail,
                showRemind: false
            })
        }
    },
    delHis(e) {
        this.setData({
            searchHis: e.detail
        })
        wx.setStorageSync('trackSearchHis', e.detail)
    },
})