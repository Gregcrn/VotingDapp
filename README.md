# Défi - Voting DApp

Create a voting Dapps built around the smart contract

Here is a video presentation of the project : https://www.loom.com/share/a0a83d28c9894ff9906df5a465ba2849

# 🏁 Run the project

The following instructions will allow you to install the project:

- To clone the project, enter the following command line:
  `npm clone https://github.com/Gregcrn/VotingDapp.git`

## Frontend configuration

```bash
cd front

npm install
npm run dev
```

## Smart-contract truffle configuration

```bash
cd truffle
npm install
truffle migrate
```

## 🎬 The project scenario

Voters are whitelisted using their Ethereum address by the contract owner, can submit new proposals in a proposal registration session, and can vote on proposals in the voting session. The winner is determined by a simple majority; the proposal with the most votes wins.

### 🏎️ Processus

- Registering a white list of voters.
- The administrator to start the proposal registration session.
- The registered voters to register their proposals.
- The administrator to end the proposal registration session.
- The administrator to begin the voting session.
- Registered voters to vote for their preferred proposals.
- The administrator to end the voting session.
- The administrator to tally the votes.
- For everyone to see the results.

### 🖥️ Remix & Visual Studio Code & truffle⛓️

## Constraints

- Your smart contract must be called "Voting".
- Your smart contract must use version 0.8.17 of the compiler.
- The administrator is the one who will deploy the smart contract.
- Your smart contract must define the following data structures:

```
struct Voter {
    bool isRegistered;
    bool hasVoted;
    uint256 votedProposalId;
}

struct Proposal {
    string description;
    uint256 voteCount;
}
```

- Your smart contract must define an enumeration that manages the different states of a vote:

```
enum WorkflowStatus {
    RegisteringVoters,
    ProposalsRegistrationStarted,
    ProposalsRegistrationEnded,
    VotingSessionStarted,
    VotingSessionEnded,
    VotesTallied
}
```

- Your smart contract must define an uint `winningProposalID` that represents the id of the winner.
- Your smart contract must import the smart contract library "Ownable" from OpenZepplin.
