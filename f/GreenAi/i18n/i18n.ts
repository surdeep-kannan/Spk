// i18n/i18n.ts

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// --- TRANSLATION RESOURCES (Requires Verification by Native Speakers) ---
const resources = {
  // English (Base)
  en: {
    translation: {
      "app_title": "Eco Route",
      "dashboard_title": "Driver Dashboard",
      "welcome_message": "Hello, Driver!",
      "status_label": "Current Status:",
      "ready_route": "Ready for New Route",
      "co2_saved_today": "CO₂ Saved Today",
      "kg_unit": "kg",
      "start_route_btn": "START NEW ROUTE",
      "exit_role_btn": "Exit / Switch Role",
      "plan_route_header": "Plan Your Eco Route",
      "vehicle_label": "Vehicle",
      "start_source": "Starting Point Source",
      "use_gps": "Use Current GPS",
      "enter_manually": "Enter Manually",
      "start_point": "Starting Point",
      "destination_label": "Destination",
      "find_route_btn": "FIND ECO ROUTE",
      "fetching_loc": "Fetching Location...",
      "permission_denied": "Permission Denied",
      "failed_loc": "Failed to get location.",
      "trip_completed_header": "Trip Completed!",
      "final_score": "Final Eco Score",
      "total_distance": "Total Distance:",
      "average_speed": "Average Speed:",
      "co2_saved_route": "CO₂ Saved on Route:",
      "return_dashboard": "Return to Dashboard",
      "live_map_guidance": "Live Map Guidance Area",
      "navigating_to": "Navigating to:",
      "eco_savings_est": "Eco Savings Estimate:",
      "real_time_co2": "Real-Time CO₂ Rate:",
      "end_trip_btn": "END TRIP & SUMMARIZE",
      "km_unit": "km",
      "kmh_unit": "km/h",
      "kgkm_unit": "kg/km",
      "trip_history": "Trip History",
    }
  },
  // Hindi (hi)
  hi: {
    translation: {
      "app_title": "इको रूट",
      "dashboard_title": "ड्राइवर डैशबोर्ड",
      "welcome_message": "नमस्ते, ड्राइवर!",
      "status_label": "वर्तमान स्थिति:",
      "ready_route": "नए मार्ग के लिए तैयार",
      "co2_saved_today": "आज CO₂ की बचत",
      "kg_unit": "किलो",
      "start_route_btn": "नया मार्ग शुरू करें",
      "exit_role_btn": "बाहर निकलें / भूमिका बदलें",
      "plan_route_header": "अपने इको मार्ग की योजना बनाएं",
      "vehicle_label": "वाहन",
      "start_source": "प्रारंभिक बिंदु स्रोत",
      "use_gps": "वर्तमान जीपीएस का उपयोग करें",
      "enter_manually": "मैन्युअल रूप से दर्ज करें",
      "start_point": "प्रारंभिक बिंदु",
      "destination_label": "गंतव्य",
      "find_route_btn": "इको मार्ग खोजें",
      "fetching_loc": "स्थान लाया जा रहा है...",
      "permission_denied": "अनुमति अस्वीकृत",
      "failed_loc": "स्थान प्राप्त करने में विफल।",
      "trip_completed_header": "यात्रा पूरी हुई!",
      "final_score": "अंतिम इको स्कोर",
      "total_distance": "कुल दूरी:",
      "average_speed": "औसत गति:",
      "co2_saved_route": "मार्ग पर CO₂ की बचत:",
      "return_dashboard": "डैशबोर्ड पर लौटें",
      "live_map_guidance": "लाइव मानचित्र मार्गदर्शन क्षेत्र",
      "navigating_to": "पर नेविगेट कर रहा है:",
      "eco_savings_est": "इको बचत अनुमान:",
      "real_time_co2": "वास्तविक समय CO₂ दर:",
      "end_trip_btn": "यात्रा समाप्त करें और सारांशित करें",
      "km_unit": "किमी",
      "kmh_unit": "किमी/घंटा",
      "kgkm_unit": "किलो/किमी",
      "trip_history": "यात्रा इतिहास",
    }
  },
  // Marathi (mr) - Simplified keys only
  mr: { translation: { 
      "welcome_message": "नमस्कार, ड्रायव्हर!", 
      "dashboard_title": "ड्रायव्हर डॅशबोर्ड",
      "start_route_btn": "नवीन मार्ग सुरू करा",
      "exit_role_btn": "बाहेर पडा",
      "co2_saved_today": "आज CO₂ वाचवली",
      "plan_route_header": "तुमच्या मार्गाची योजना करा",
      "destination_label": "गंतव्यस्थान",
      "find_route_btn": "इको मार्ग शोधा",
      "trip_completed_header": "प्रवास पूर्ण झाला!",
  }},
  // Telugu (te) - Simplified keys only
  te: { translation: { 
      "welcome_message": "నమస్కారం, డ్రైవర్!", 
      "dashboard_title": "డ్రైవర్ డాష్‌బోర్డ్",
      "start_route_btn": "కొత్త మార్గాన్ని ప్రారంభించండి",
      "exit_role_btn": "నిష్క్రమించు",
      "co2_saved_today": "ఈరోజు CO₂ ఆదా",
      "plan_route_header": "మీ మార్గాన్ని ప్లాన్ చేయండి",
      "destination_label": "గమ్యం",
      "find_route_btn": "ఎకో రూట్‌ను కనుగొనండి",
      "trip_completed_header": "ట్రిప్ పూర్తయింది!",
  }},
  // Tamil (ta) - Simplified keys only
  ta: { translation: { 
      "welcome_message": "வணக்கம், ஓட்டுநர்!", 
      "dashboard_title": "டிரைவர் டாஷ்போர்டு",
      "start_route_btn": "புதிய வழியைத் தொடங்கவும்",
      "exit_role_btn": "வெளியேறு",
      "co2_saved_today": "இன்று CO₂ சேமிக்கப்பட்டது",
      "plan_route_header": "உங்கள் வழியைத் திட்டமிடுங்கள்",
      "destination_label": "சேருமிடம்",
      "find_route_btn": "சுற்றுச்சூழல் வழியைக் கண்டறியவும்",
      "trip_completed_header": "பயணம் முடிந்தது!",
  }},
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // react already safes from xss
    }
  });

export default i18n;