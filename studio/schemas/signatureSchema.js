export const signatureSchema = {
  name: 'signatures',
  title: 'Signatures',
  type: 'document',
  fields: [
    {
      name: 'signedBy',
      title: 'Signature By',
      type: 'string',
    },
    {
      name: 'whitelistAddress',
      title: 'Whitelist Address',
      type: 'string',
    },
    {
      name: 'signedHash',
      title: 'Signed Hash',
      type: 'string',
    },
    {
      name: 'signature',
      title: 'Signature',
      type: 'string',
    },
  ],
}