import sdk from "./1-initialize-sdk.js";

const TOKEN_ADDRESS = '0x9683903F1Aacf6A403f9F1A034957582873C806F';

(async () => {
  try {
    const voteContractAddress = await sdk.deployer.deployVote({
      name: 'voting',
      voting_token_address: TOKEN_ADDRESS,

      // 提案が作成された後、メンバーがすぐに投票できるように0ブロックを設定
      voting_delay_in_blocks: 0,

      // 提案が作成された後、メンバーが投票できる期間を１日（6,570ブロック）に設定
      voting_period_in_blocks: 6570,

      // 提案の投票期間が終了した後、提案が有効となるために投票する必要があるトークンの総供給量の最小値を0%に設定
      voting_quorum_fraction: 0,

      // ユーザーが提案するために必要なトークンの最小値を0に設定
      proposal_token_threshold: 0,
    });

    console.log("Successfully deployed vote contract, address: ", voteContractAddress);
  } catch (error) {
    console.log(error)
  }
})();