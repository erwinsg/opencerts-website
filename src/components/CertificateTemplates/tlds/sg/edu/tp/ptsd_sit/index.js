import PropTypes from "prop-types";
import MultiCertificateRenderer from "template-utils/MultiCertificateRenderer";

import TPCert from "./certificate";
import TPTranscript from "../common/partTimeTranscript";
import ApprovedAddresses from "../common/approvedAddresses";

const templates = [
  {
    id: "certificate",
    label: "Certificate",
    template: TPCert
  },
  {
    id: "transcript",
    label: "Transcript",
    template: TPTranscript
  }
];

const ptsdSit = ({ certificate }) => (
  <MultiCertificateRenderer
    certificate={certificate}
    templates={templates}
    whitelist={ApprovedAddresses}
  />
);

ptsdSit.propTypes = {
  certificate: PropTypes.object.isRequired
};

export default ptsdSit;
