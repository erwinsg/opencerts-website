import { Selector } from "testcafe";

fixture("Singapore Examinations and Assessment Board (SOR_PSLE_1993_2012)")
  .page`http://localhost:3000`;

const Certificate = "./SOR_ALL-1993_PSLE_01001C.opencert";

const TemplateTabList = Selector("#template-tabs-list");
const RenderedCertificate = Selector("#rendered-certificate");

const validateTextContent = async (t, component, texts) =>
  texts.reduce(
    async (prev, curr) => t.expect(component.textContent).contains(curr),
    Promise.resolve()
  );

test("sg/gov/seab/SOR_PSLE_1993_2012 is rendered correctly", async t => {
  // Uploads and click link certificate via dropzone
  await t.setFilesToUpload("input[type=file]", [Certificate]);

  // Certificate tabs rendered
  await t.expect(TemplateTabList.textContent).contains("Statement of Results");
  await t.expect(TemplateTabList.textContent).contains("Explanatory Notes");

  // SOR tab content
  await validateTextContent(t, RenderedCertificate, [
    "I certify that in the",
    "held in the year",
    "Candidate",
    "NRIC/Foreign Identification No.",
    "Index No.",
    "obtained the grades for the subjects stated below:",
    "SUBJECT",
    "GRADE",
    "AGGREGATE SCORE",
    "This statement is issued to",
    "Singapore Examinations and Assessment Board",
    "PRIMARY SCHOOL LEAVING EXAMINATION",
    "S8136843J",
    "01001C",
    "Chief Executive"
  ]);

  // Navigate to Explanatory Notes tab
  const explanatoryNotesTab = TemplateTabList.find(":nth-child(2)");
  await t.click(explanatoryNotesTab);

  // Explanatory Notes tab content
  await validateTextContent(t, RenderedCertificate, [
    "EXPLANATORY NOTES",
    "1990 onwards",
    "Identification Number / Clarifications"
  ]);
});
