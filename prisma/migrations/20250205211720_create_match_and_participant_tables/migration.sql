/*
  Warnings:

  - You are about to drop the column `account_Id` on the `SummonerId` table. All the data in the column will be lost.
  - You are about to drop the column `summoner_Id` on the `SummonerId` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[summoner_id]` on the table `SummonerId` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[account_id]` on the table `SummonerId` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `account_id` to the `SummonerId` table without a default value. This is not possible if the table is not empty.
  - Added the required column `summoner_id` to the `SummonerId` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "SummonerId_account_Id_key";

-- DropIndex
DROP INDEX "SummonerId_summoner_Id_key";

-- AlterTable
ALTER TABLE "SummonerId" DROP COLUMN "account_Id",
DROP COLUMN "summoner_Id",
ADD COLUMN     "account_id" TEXT NOT NULL,
ADD COLUMN     "summoner_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "SummonerMastery" (
    "id" SERIAL NOT NULL,
    "puuid" TEXT NOT NULL,
    "champion_id" INTEGER NOT NULL,
    "champion_level" INTEGER NOT NULL,
    "champion_points" INTEGER NOT NULL,
    "lastPlay_time" BIGINT NOT NULL,

    CONSTRAINT "SummonerMastery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Match" (
    "match_id" TEXT NOT NULL,
    "start" BIGINT NOT NULL,
    "end" BIGINT NOT NULL,
    "duration" INTEGER NOT NULL,
    "gamemode" TEXT NOT NULL,
    "game_type" TEXT NOT NULL,
    "game_version" TEXT NOT NULL,

    CONSTRAINT "Match_pkey" PRIMARY KEY ("match_id")
);

-- CreateTable
CREATE TABLE "Participant" (
    "match_id" TEXT NOT NULL,
    "puuid" TEXT NOT NULL,
    "team_id" INTEGER NOT NULL,
    "win" BOOLEAN NOT NULL,
    "champion_id" INTEGER NOT NULL,
    "time_played" INTEGER NOT NULL,
    "lane" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "individual_position" TEXT NOT NULL,

    CONSTRAINT "Participant_pkey" PRIMARY KEY ("match_id","puuid")
);

-- CreateTable
CREATE TABLE "ParticipantPerformance" (
    "match_id" TEXT NOT NULL,
    "puuid" TEXT NOT NULL,
    "champion_level" INTEGER NOT NULL,
    "gold_earned" INTEGER NOT NULL,
    "gold_spent" INTEGER NOT NULL,
    "kills" INTEGER NOT NULL,
    "deaths" INTEGER NOT NULL,
    "assists" INTEGER NOT NULL,
    "total_damage" INTEGER NOT NULL,
    "total_damage_to_champions" INTEGER NOT NULL,
    "magic_damage_to_champions" INTEGER NOT NULL,
    "physical_damage_to_champions" INTEGER NOT NULL,
    "largest_critical_strike" INTEGER NOT NULL,
    "double_kills" INTEGER NOT NULL,
    "triple_kills" INTEGER NOT NULL,
    "quadra_kills" INTEGER NOT NULL,
    "penta_kills" INTEGER NOT NULL,
    "largest_killing_spree" INTEGER NOT NULL,
    "largest_multi_kill" INTEGER NOT NULL,
    "longest_time_living" INTEGER NOT NULL,
    "total_time_spent_dead" INTEGER NOT NULL,
    "time_ccing_others" INTEGER NOT NULL,
    "time_cc_dealt" INTEGER NOT NULL,
    "total_minions_killed" INTEGER NOT NULL,
    "total_ally_jungle_monsters_killed" INTEGER NOT NULL,
    "total_enemy_jungle_monsters_killed" INTEGER NOT NULL,
    "first_blood_kill" BOOLEAN NOT NULL,
    "first_blood_assist" BOOLEAN NOT NULL,
    "turret_kills" INTEGER NOT NULL,
    "turret_takedowns" INTEGER NOT NULL,
    "objectives_stolen" INTEGER NOT NULL,
    "objectives_stolen_assists" INTEGER NOT NULL,
    "vision_score" INTEGER NOT NULL,
    "wards_killed" INTEGER NOT NULL,
    "stealth_wards_placed" INTEGER NOT NULL,
    "vision_wards_placed" INTEGER NOT NULL,

    CONSTRAINT "ParticipantPerformance_pkey" PRIMARY KEY ("match_id","puuid")
);

-- CreateTable
CREATE TABLE "ParticipantBuild" (
    "match_id" TEXT NOT NULL,
    "puuid" TEXT NOT NULL,
    "item_0" INTEGER NOT NULL,
    "item_1" INTEGER NOT NULL,
    "item_2" INTEGER NOT NULL,
    "item_3" INTEGER NOT NULL,
    "item_4" INTEGER NOT NULL,
    "item_5" INTEGER NOT NULL,
    "item_6" INTEGER NOT NULL,
    "summoner_1_id" INTEGER NOT NULL,
    "summoner_2_id" INTEGER NOT NULL,
    "consumables_purchased" INTEGER NOT NULL,
    "sight_wards_bought" INTEGER NOT NULL,
    "vision_wards_bought" INTEGER NOT NULL,

    CONSTRAINT "ParticipantBuild_pkey" PRIMARY KEY ("match_id","puuid")
);

-- CreateTable
CREATE TABLE "ParticipantPings" (
    "match_id" TEXT NOT NULL,
    "puuid" TEXT NOT NULL,
    "basic_pings" INTEGER NOT NULL,
    "all_in_pings" INTEGER NOT NULL,
    "assist_me_pings" INTEGER NOT NULL,
    "command_pings" INTEGER NOT NULL,
    "danger_pings" INTEGER NOT NULL,
    "enemy_missing_pings" INTEGER NOT NULL,
    "enemy_vision_pings" INTEGER NOT NULL,
    "need_vision_pings" INTEGER NOT NULL,
    "fallback_pings" INTEGER NOT NULL,
    "hold_pings" INTEGER NOT NULL,
    "on_my_way_pings" INTEGER NOT NULL,
    "push_pings" INTEGER NOT NULL,

    CONSTRAINT "ParticipantPings_pkey" PRIMARY KEY ("match_id","puuid")
);

-- CreateTable
CREATE TABLE "ParticipantCasts" (
    "match_id" TEXT NOT NULL,
    "puuid" TEXT NOT NULL,
    "spell_1_casts" INTEGER NOT NULL,
    "spell_2_casts" INTEGER NOT NULL,
    "spell_3_casts" INTEGER NOT NULL,
    "spell_4_casts" INTEGER NOT NULL,
    "summoner_1_casts" INTEGER NOT NULL,
    "summoner_2_casts" INTEGER NOT NULL,

    CONSTRAINT "ParticipantCasts_pkey" PRIMARY KEY ("match_id","puuid")
);

-- CreateTable
CREATE TABLE "ParticipantChallenges" (
    "match_id" TEXT NOT NULL,
    "puuid" TEXT NOT NULL,
    "ability_uses" INTEGER,
    "aces_before_15_minutes" INTEGER,
    "allied_jungle_monster_kills" INTEGER,
    "baron_takedowns" INTEGER,
    "blast_cone_opposite_opponent_count" INTEGER,
    "bounty_gold" INTEGER,
    "buffs_stolen" INTEGER,
    "complete_support_quest_in_time" INTEGER,
    "control_wards_placed" INTEGER,
    "damage_per_minute" DOUBLE PRECISION,
    "damage_taken_on_team_percentage" DOUBLE PRECISION,
    "danced_with_rift_herald" INTEGER,
    "deaths_by_enemy_champs" INTEGER,
    "dodge_skill_shots_small_window" INTEGER,
    "double_aces" INTEGER,
    "dragon_takedowns" INTEGER,
    "effective_heal_and_shielding" DOUBLE PRECISION,
    "elder_dragon_kills_with_opposing_soul" INTEGER,
    "elder_dragon_multikills" INTEGER,
    "enemy_champion_immobilizations" INTEGER,
    "enemy_jungle_monster_kills" INTEGER,
    "epic_monster_kills_near_enemy_jungler" INTEGER,
    "epic_monster_kills_within_30_seconds_of_spawn" INTEGER,
    "epic_monster_steals" INTEGER,
    "epic_monster_stolen_without_smite" INTEGER,
    "first_turret_killed" INTEGER,
    "first_turret_killed_time" DOUBLE PRECISION,
    "flawless_aces" INTEGER,
    "full_team_takedown" INTEGER,
    "game_length" DOUBLE PRECISION,
    "get_takedowns_in_all_lanes_early_jungle_as_laner" INTEGER,
    "gold_per_minute" DOUBLE PRECISION,
    "had_open_nexus" INTEGER,
    "immobilize_and_kill_with_ally" INTEGER,
    "initial_buff_count" INTEGER,
    "initial_crab_count" INTEGER,
    "jungle_cs_before_10_minutes" INTEGER,
    "jungler_takedowns_near_damaged_epic_monster" INTEGER,
    "k_turrets_destroyed_before_plates_fall" INTEGER,
    "kda" DOUBLE PRECISION,
    "kill_after_hidden_with_ally" INTEGER,
    "kill_participation" DOUBLE PRECISION,
    "killed_champ_took_full_team_damage_survived" INTEGER,
    "killing_sprees" INTEGER,
    "kills_near_enemy_turret" INTEGER,
    "kills_on_other_lanes_early_jungle_as_laner" INTEGER,
    "kills_on_recently_healed_by_aram_pack" INTEGER,
    "kills_under_own_turret" INTEGER,
    "kills_with_help_from_epic_monster" INTEGER,
    "knock_enemy_into_team_and_kill" INTEGER,
    "land_skill_shots_early_game" INTEGER,
    "lane_minions_first_10_minutes" INTEGER,
    "legendary_count" INTEGER,
    "lost_an_inhibitor" INTEGER,
    "max_kill_deficit" INTEGER,
    "mejais_full_stack_in_time" INTEGER,
    "more_enemy_jungle_than_opponent" INTEGER,
    "multi_kill_one_spell" INTEGER,
    "multi_turret_rift_herald_count" INTEGER,
    "multikills" INTEGER,
    "multikills_after_aggressive_flash" INTEGER,
    "outer_turret_executes_before_10_minutes" INTEGER,
    "outnumbered_kills" INTEGER,
    "outnumbered_nexus_kill" INTEGER,
    "perfect_dragon_souls_taken" INTEGER,
    "perfect_game" INTEGER,
    "pick_kill_with_ally" INTEGER,
    "poro_explosions" INTEGER,
    "quick_cleanse" INTEGER,
    "quick_first_turret" INTEGER,
    "quick_solo_kills" INTEGER,
    "rift_herald_takedowns" INTEGER,
    "save_ally_from_death" INTEGER,
    "scuttle_crab_kills" INTEGER,
    "shortest_time_to_ace_from_first_takedown" DOUBLE PRECISION,
    "skillshots_dodged" INTEGER,
    "skillshots_hit" INTEGER,
    "snowballs_hit" INTEGER,
    "solo_baron_kills" INTEGER,
    "solo_kills" INTEGER,
    "stealth_wards_placed" INTEGER,
    "survived_single_digit_hp_count" INTEGER,
    "survived_three_immobilizes_in_fight" INTEGER,
    "takedown_on_first_turret" INTEGER,
    "takedowns" INTEGER,
    "takedowns_after_gaining_level_advantage" INTEGER,
    "takedowns_before_jungle_minion_spawn" INTEGER,
    "takedowns_first_x_minutes" INTEGER,
    "takedowns_in_alcove" INTEGER,
    "takedowns_in_enemy_fountain" INTEGER,
    "team_baron_kills" INTEGER,
    "team_damage_percentage" DOUBLE PRECISION,
    "team_elder_dragon_kills" INTEGER,
    "team_rift_herald_kills" INTEGER,
    "took_large_damage_survived" INTEGER,
    "turret_plates_taken" INTEGER,
    "turret_takedowns" INTEGER,
    "turrets_taken_with_rift_herald" INTEGER,
    "twenty_minions_in_3_seconds_count" INTEGER,
    "two_wards_one_sweeper_count" INTEGER,
    "unseen_recalls" INTEGER,
    "vision_score_per_minute" DOUBLE PRECISION,
    "void_monster_kill" INTEGER,
    "ward_takedowns" INTEGER,
    "ward_takedowns_before_20m" INTEGER,
    "wards_guarded" INTEGER,

    CONSTRAINT "ParticipantChallenges_pkey" PRIMARY KEY ("match_id","puuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "SummonerMastery_puuid_champion_id_key" ON "SummonerMastery"("puuid", "champion_id");

-- CreateIndex
CREATE UNIQUE INDEX "Match_match_id_key" ON "Match"("match_id");

-- CreateIndex
CREATE UNIQUE INDEX "SummonerId_summoner_id_key" ON "SummonerId"("summoner_id");

-- CreateIndex
CREATE UNIQUE INDEX "SummonerId_account_id_key" ON "SummonerId"("account_id");

-- AddForeignKey
ALTER TABLE "SummonerMastery" ADD CONSTRAINT "SummonerMastery_puuid_fkey" FOREIGN KEY ("puuid") REFERENCES "SummonerId"("puuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_match_id_fkey" FOREIGN KEY ("match_id") REFERENCES "Match"("match_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_puuid_fkey" FOREIGN KEY ("puuid") REFERENCES "SummonerId"("puuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParticipantPerformance" ADD CONSTRAINT "ParticipantPerformance_match_id_puuid_fkey" FOREIGN KEY ("match_id", "puuid") REFERENCES "Participant"("match_id", "puuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParticipantBuild" ADD CONSTRAINT "ParticipantBuild_match_id_puuid_fkey" FOREIGN KEY ("match_id", "puuid") REFERENCES "Participant"("match_id", "puuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParticipantPings" ADD CONSTRAINT "ParticipantPings_match_id_puuid_fkey" FOREIGN KEY ("match_id", "puuid") REFERENCES "Participant"("match_id", "puuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParticipantCasts" ADD CONSTRAINT "ParticipantCasts_match_id_puuid_fkey" FOREIGN KEY ("match_id", "puuid") REFERENCES "Participant"("match_id", "puuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParticipantChallenges" ADD CONSTRAINT "ParticipantChallenges_match_id_puuid_fkey" FOREIGN KEY ("match_id", "puuid") REFERENCES "Participant"("match_id", "puuid") ON DELETE RESTRICT ON UPDATE CASCADE;
