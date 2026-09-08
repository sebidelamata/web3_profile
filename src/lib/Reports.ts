export interface Report {
    id: number;
    title: string;
    url: string;
}

export const REPORTS: Report[] = [
    {
        id: 1,
        title: 'passwordstore',
        url: 'https://github.com/sebidelamata/security-research-reports/blob/main/passwordstore-audit-2026-02-18.pdf',
    },
    {
        id: 2,
        title: 'puppy-raffle',
        url: 'https://github.com/sebidelamata/security-research-reports/blob/main/PuppyRaffleReport.pdf'
    },
    {
        id: 3,
        title: 'tswap',
        url: 'https://github.com/sebidelamata/security-research-reports/blob/main/TSwap_Audit_Report.pdf'
    },
    {
        id: 4,
        title: 'thunderloan',
        url: 'https://github.com/sebidelamata/security-research-reports/blob/main/ThunderLoan_Audit_Report.pdf'
    },
    {
        id: 5,
        title: 'boss-bridge',
        url: 'https://github.com/sebidelamata/security-research-reports/blob/main/Boss_Bridge_Security_Research_Report.pdf'
    },
    {
        id: 6,
        title: 'snowman-merkle-airdrop',
        url: 'https://github.com/sebidelamata/security-research-reports/blob/main/Snowman_Merkle_Airdrop_Smart_Contract_Security_Research_Report.pdf'
    }
]