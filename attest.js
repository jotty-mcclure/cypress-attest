const attestNode = require('attest-node');
const attest = attestNode.buildAttestSource();

process.stdout.write(attest.source);