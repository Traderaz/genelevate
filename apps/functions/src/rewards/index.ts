/**
 * Rewards & Leaderboards Functions
 * 
 * Handles points system, leaderboard computation,
 * and rewards redemption
 */

import { computeLeaderboards, awardPoints, manualComputeLeaderboards } from './computeLeaderboards';
import { redeemReward } from './redeemReward';

export const rewardsFunctions = {
  computeLeaderboards,
  awardPoints,
  manualComputeLeaderboards,
  redeemReward,
};
