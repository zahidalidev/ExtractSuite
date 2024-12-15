const domains = [
    '@gmail',
    '@yahoo',
    '@domain',
    'info@',
    'sales@',
    'support@',
    'contact@',
    'admin@',
    'editor@',
    'marketing@',
    'feedback@',
    'hr@',
    'team@',
    'customerservice@',
    'office@',
    'mail@',
    'enquiries@',
    '@hotmail',
]

const extractOptions = [
    { name: 'phone', value: 'Extract Phone Numbers' },
    { name: 'services', value: 'Extract Company Services' },
    { name: 'indicators', value: 'Extract Key Indicators' },
    { name: 'about', value: 'Extract About' },
    { name: 'contacts', value: 'Extract Contacts' },
    { name: 'addresses', value: 'Extract Addresses' },
    { name: 'social', value: 'Extract Social Media Links' },
    { name: 'logo', value: 'Extract Logo' },
    { name: 'emails', value: 'Extract Emails' },
]
// const emailOptions = [
//     'Single Email ID', 
//     'Extract Emails'
// ]


export { domains, extractOptions }