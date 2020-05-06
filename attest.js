const attestNode = require('@deque/attest-node');
const attest = attestNode.buildAttestSource();

process.stdout.write(attest.source);