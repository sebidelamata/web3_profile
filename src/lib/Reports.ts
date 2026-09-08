export interface Report {
    id: number;
    title: string;
    url: string;
    description: string;
}

export const REPORTS: Report[] = [
    {
        id: 1,
        title: 'passwordstore',
        url: 'https://github.com/sebidelamata/security-research-reports/blob/main/passwordstore-audit-2026-02-18.pdf',
        description: 'Security review of PasswordStore, a Solidity-based password storage contract designed to restrict access to sensitive data. The audit identified two high-severity vulnerabilities: storing the password on-chain exposes it publicly, eliminating its intended privacy, while missing access controls on `setPassword` allow unauthorized users to modify the stored password. An additional informational finding identified an inaccurate NatSpec parameter in `getPassword`.'
    },
    {
        id: 2,
        title: 'puppy-raffle',
        url: 'https://github.com/sebidelamata/security-research-reports/blob/main/PuppyRaffleReport.pdf',
        description: 'Security review of Puppy Raffle, a Solidity-based raffle protocol for awarding Puppy NFTs to participants. The audit identified seven issues, including three high-severity vulnerabilities involving a reentrancy attack capable of draining contract funds, predictable and manipulable randomness affecting winner selection and NFT rarity, and integer overflow causing loss of accumulated fees. Additional findings covered denial-of-service risks, unsafe ETH transfers, and gas optimization opportunities.'
    },
    {
        id: 3,
        title: 'tswap',
        url: 'https://github.com/sebidelamata/security-research-reports/blob/main/TSwap_Audit_Report.pdf',
        description: 'Security review of TSwap, a Uniswap V1-style decentralized exchange implementing an x * y = k constant-product invariant. The audit identified 10 issues across the scoped Solidity contracts, including four high-severity vulnerabilities involving incorrect fee calculations, missing slippage protection, token mismatches, and an exploitable mechanism that could break the pool invariant and drain funds. Additional findings covered missing deadline enforcement, inaccurate event emissions, and incorrect return values.'
    },
    {
        id: 4,
        title: 'thunderloan',
        url: 'https://github.com/sebidelamata/security-research-reports/blob/main/ThunderLoan_Audit_Report.pdf',
        description: 'Security review of ThunderLoan, a Solidity-based flash loan protocol that allows liquidity providers to earn fees from deposited assets. The audit identified four vulnerabilities, including three high-severity issues involving incorrect exchange-rate accounting, a flash loan repayment bypass capable of draining protocol liquidity, and storage collisions that could freeze the protocol during upgrades. A medium-severity finding also identified an oracle manipulation vulnerability caused by reliance on TSwap pricing.'
    },
    {
        id: 5,
        title: 'boss-bridge',
        url: 'https://github.com/sebidelamata/security-research-reports/blob/main/Boss_Bridge_Security_Research_Report.pdf',
        description: 'Security review of Boss Bridge, a Solidity-based token bridge for transferring assets from Ethereum to zkSync through an L1 vault and off-chain minting mechanism. The audit identified three high-severity vulnerabilities, including arbitrary token transfers from user accounts and the bridge vault through an unrestricted `from` parameter, as well as signature replay attacks that could allow an attacker to repeatedly withdraw tokens and drain the vault. Recommended mitigations included enforcing caller-controlled deposits and single-use withdrawal authorization.'
    },
    {
        id: 6,
        title: 'snowman-merkle-airdrop',
        url: 'https://github.com/sebidelamata/security-research-reports/blob/main/Snowman_Merkle_Airdrop_Smart_Contract_Security_Research_Report.pdf',
        description: 'Security review of the Snowman Merkle Airdrop, a Solidity-based system combining an ERC20 token, on-chain ERC721 NFTs, and Merkle-tree-based eligibility verification. The audit identified 10 vulnerabilities, including three high-severity issues involving unrestricted NFT minting, replayable airdrop claims, and incorrect handling of snapshot balances that can prevent legitimate claims. Additional medium and low findings covered fee collection failures, global cooldowns, EIP-712 compatibility, event observability, gas efficiency, and deployment misconfiguration risks.'
    }
]