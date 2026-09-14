/**
 * Editable commercial configuration for PLM AI Services product website.
 * Fill placeholders before publishing ads or Store campaigns.
 */
window.PLMOPS_CONFIG = {
  FORM_ENDPOINT: "",
  TO_EMAIL: "teamcentersap@gmail.com",

  SITE_NAME: "PLM AI Services",
  SITE_URL: "https://plmaiservice.com",
  SITE_TAGLINE: "Practical Windows software for manufacturing, engineering and product-data teams.",
  SUPPORT_EMAIL: "teamcentersap@gmail.com",

  YOUTUBE_CHANNEL_URL: "https://www.youtube.com/@PLMSAPAISolutions",
  FACEBOOK_GROUP_NAME: "PLM SAP Tool Room",
  FACEBOOK_GROUP_URL: "",

  GA_MEASUREMENT_ID: "G-77043KQ3MP",
  META_PIXEL_ID: "",

  CAMPAIGN_IDS: {
    facebook_bom_compare: "facebook_bom_compare",
    facebook_docrev: "facebook_docrev",
    facebook_erp_validator: "facebook_erp_validator",
    instagram_bom_compare: "instagram_bom_compare",
    linkedin_bom_compare: "linkedin_bom_compare",
    youtube_bom_compare: "youtube_bom_compare",
    website_home: "website_home",
    website_product_page: "website_product_page"
  },

  products: {
    bom: {
      id: "bom",
      name: "BOM Compare Tool",
      shortName: "BOM Compare",
      page: "bom-compare.html",
      problem: "Compare Source and Target BOM files and review Matched, Different and side-only rows.",
      description: "Compare two Bills of Materials on Windows (CSV, Excel, JSON; PLMXML on Source). Validate BOMs locally and export CSV/PDF on the paid plan.",
      storeUrl: "https://apps.microsoft.com/detail/9nq1k3vh33kv?hl=en-US&gl=IN",
      storeReady: true,
      price: "See Microsoft Store listing",
      trial: "Free compare + view; paid unlocks CSV/PDF export. 30-day Pro trial in next Store build—confirm on Store.",
      screenshot: "assets/img/bom-compare-ui.png",
      ogImage: "assets/og/bom-compare.png",
      demoUrl: "",
      demoTitle: "BOM Compare Tool Demo",
      storeEvent: "click_bom_store",
      viewEvent: "view_bom_compare",
      campaignHome: "website_home",
      campaignPage: "website_product_page",
      campaignFacebook: "facebook_bom_compare",
      benefits: [
        "Upload Source BOM and Target BOM, then Validate BOMs",
        "Review Matched, Different, Source-only and Target-only rows",
        "Export CSV/PDF on paid plan; processing stays on your PC"
      ],
      users: [
        "Manufacturing and product-data teams",
        "Engineering offices",
        "PLM and ERP export workflows",
        "Small and mid-size manufacturers"
      ],
      inputs: "CSV, Excel (.xlsx), JSON; PLMXML (Source BOM only); max 50 MB per file",
      output: "Matched/Different/side-only results; CSV/PDF export on paid plan",
      os: "Windows",
      requirements: "Windows 10 or later (x64). Keyboard and mouse."
    },
    docrev: {
      id: "docrev",
      name: "DocRev Manager",
      shortName: "DocRev Manager",
      page: "docrev-manager.html",
      problem: "Control engineering documents, numbering and revisions from one Windows application.",
      description: "Control engineering documents, numbering and revisions in one Windows application built for small manufacturers, engineering offices and project teams.",
      storeUrl: "https://apps.microsoft.com/detail/9mxr3wlmq0g7?hl=en-US&gl=IN",
      storeReady: true,
      price: "$59.99 USD one-time (confirm on Microsoft Store)",
      trial: "Free trial where offered on Microsoft Store",
      screenshot: "assets/img/docrev-manager-ui.png",
      ogImage: "assets/og/docrev-manager.png",
      demoUrl: "",
      demoTitle: "DocRev Manager Demo",
      storeEvent: "click_docrev_store",
      viewEvent: "view_docrev_manager",
      campaignHome: "website_home",
      campaignPage: "website_product_page",
      campaignFacebook: "facebook_docrev",
      benefits: [
        "Automatic numbering and revision history in a local vault",
        "Transmittal ZIP, shop floor and job packet workflows",
        "Search, CSV export and one-click database backup — offline"
      ],
      users: [
        "Design offices and machine builders",
        "Manufacturing and QA teams",
        "Engineering contractors",
        "Teams replacing shared-folder document control"
      ],
      inputs: "PDF, DWG/DXF, Solid Edge, STEP/STP, Office, PNG, JPG and other vault files",
      output: "Document register, local vault, transmittal ZIP, CSV export and DB backup",
      os: "Windows",
      requirements: "Windows 10 version 1809 (build 17763) or later, or Windows 11. Keyboard and mouse."
    },
    erp: {
      id: "erp",
      name: "ERP Migration File Validator",
      shortName: "ERP Validator",
      page: "erp-migration-validator.html",
      problem: "Validate ERP migration files and identify data-quality problems before upload.",
      description: "Validate Excel and CSV migration files, identify missing or invalid records, and improve ERP data quality before import with ERP Migration File Validator for Windows.",
      storeUrl: "",
      storeReady: false,
      storeComingSoon: "Microsoft Store link coming soon.",
      price: "$999.99 USD Professional (one-time; confirm when Store listing is live)",
      trial: "Free edition validates up to 100 records per worksheet and can export a sample report of up to 100 records. Paid edition removes that application-level record limit and unlocks corrected-file export, complete reports and saved reusable profiles.",
      screenshot: "assets/img/erp-validator-ui.png",
      ogImage: "assets/og/erp-migration-validator.png",
      demoUrl: "",
      demoTitle: "ERP Migration File Validator Demo",
      storeEvent: "click_erp_store",
      viewEvent: "view_erp_validator",
      campaignHome: "website_home",
      campaignPage: "website_product_page",
      campaignFacebook: "facebook_erp_validator",
      benefits: [
        "Check CSV, XLSX and SpreadsheetML XML files on this PC",
        "Find missing, invalid, duplicate and out-of-range values",
        "Export an audit report without overwriting the original file"
      ],
      users: [
        "ERP migration teams",
        "SAP consultants",
        "Data migration consultants",
        "Manufacturing companies",
        "Material-master teams",
        "Data-quality teams",
        "Small and mid-sized companies preparing ERP imports"
      ],
      inputs: "CSV, XLSX and SpreadsheetML XML",
      output: "Issue grid, XLSX audit report, and optional corrected sibling file (paid edition)",
      os: "Windows",
      requirements: "Windows 10 version 2004 (build 19041) or later, or Windows 11. Keyboard and mouse. Minimum usable resolution 1280 × 720. Works at 100%, 125%, 150% and 200% display scaling."
    }
  }
};
