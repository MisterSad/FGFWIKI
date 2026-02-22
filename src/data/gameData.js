export const categories = [
  { id: 'guides', label: 'navigation.guides' },
  { id: 'daily_tasks', label: 'navigation.daily_tasks' },
  { id: 'tier_list', label: 'navigation.champions' },
  { id: 'meta_ships', label: 'navigation.flagships' },
  { id: 'flagship_decks', label: 'navigation.flagship_decks' },
  { id: 'ground', label: 'navigation.ground_teams' },
  { id: 'events', label: 'navigation.events' },
  { id: 'builder', label: 'navigation.builder' },
  { id: 'gift_codes', label: 'navigation.gift_codes' },
];

export const tips = [
  // Beginner
  {
    id: 1,
    category: 'beginner',
    title: 'tips.t1_title',
    content: 'tips.t1_content',
    highlight: true
  },
  {
    id: 2,
    category: 'beginner',
    title: 'tips.t2_title',
    content: 'tips.t2_content',
    highlight: false
  },
  {
    id: 3,
    category: 'beginner',
    title: 'tips.t3_title',
    content: 'tips.t3_content',
    highlight: true
  },

  // Combat
  {
    id: 9, // New detailed guide
    category: 'combat',
    title: 'tips.fleet_power_title',
    content: 'tips.fleet_power_desc',
    highlight: true,
    hasDetails: true,
    sections: [
      {
        text: 'tips.fleet_power_intro'
      },
      {
        header: 'tips.fleet_power_energy_types_hdr',
        text: 'tips.fleet_power_energy_types_txt'
      },
      {
        image: '/images/1280X1280-2.PNG'
      },
      {
        header: 'tips.fleet_power_beam_hdr',
        text: 'tips.fleet_power_beam_txt'
      },
      {
        header: 'tips.fleet_power_kinetic_hdr',
        text: 'tips.fleet_power_kinetic_txt'
      },
      {
        header: 'tips.fleet_power_ionic_hdr',
        text: 'tips.fleet_power_ionic_txt',
        note: 'tips.fleet_power_ionic_tip'
      },
      {
        header: 'tips.fleet_power_synergy_hdr',
        text: 'tips.fleet_power_synergy_txt'
      },
      {
        grid: {
          headers: ['tips.fleet_power_synergy_tbl_col1', 'tips.fleet_power_synergy_tbl_col2'],
          rows: [
            ['tips.fleet_power_synergy_tbl_r1_c1', 'tips.fleet_power_synergy_tbl_r1_c2'],
            ['tips.fleet_power_synergy_tbl_r2_c1', 'tips.fleet_power_synergy_tbl_r2_c2']
          ]
        }
      },
      {
        header: 'tips.fleet_power_stats_hdr',
        text: 'tips.fleet_power_stats_txt',
        note: 'tips.fleet_power_stats_tip'
      },
      {
        header: 'tips.fleet_power_flagship_hdr',
        text: 'tips.fleet_power_flagship_txt'
      },
      {
        header: 'tips.fleet_power_core_hdr',
        text: 'tips.fleet_power_core_txt'
      },
      {
        image: '/images/3.jpg'
      },
      {
        header: 'tips.fleet_power_components_hdr',
        text: 'tips.fleet_power_components_txt'
      },
      {
        image: '/images/4.jpg',
        note: 'tips.fleet_power_components_tip'
      },
      {
        header: 'tips.fleet_power_formation_hdr',
        text: 'tips.fleet_power_formation_txt'
      },
      {
        image: '/images/5.png',
        note: 'tips.fleet_power_formation_tip'
      },
      {
        header: 'tips.fleet_power_final_hdr',
        text: 'tips.fleet_power_final_txt'
      }
    ]
  },
  {
    id: 4,
    category: 'combat',
    title: 'tips.t4_title',
    content: 'tips.t4_content',
    highlight: true
  },
  {
    id: 5,
    category: 'combat',
    title: 'tips.t5_title',
    content: 'tips.t5_content',
    highlight: false
  },
  {
    id: 6,
    category: 'combat',
    title: 'tips.t6_title',
    content: 'tips.t6_content',
    highlight: false
  },

  // Economy
  {
    id: 7,
    category: 'economy',
    title: 'tips.t7_title',
    content: 'tips.t7_content',
    highlight: false
  },
  {
    id: 8,
    category: 'economy',
    title: 'tips.t8_title',
    content: 'tips.t8_content',
    highlight: true
  },
];

// --- NEW DATA SECTIONS ---

export const heroData = [
  // S-Tier
  { id: 'h1', name: 'Ajita', role: 'Support/Healer', type: 'Ion', tier: 'S', notes: 'hero_data.h1_notes' },
  { id: 'h2', name: 'Zora Dominii', role: 'DPS/Finisher', type: 'Kinetic', tier: 'S', notes: 'hero_data.h2_notes' },
  { id: 'h3', name: 'Eva von Trier', role: 'Debuff/Support', type: 'Kinetic', tier: 'S', notes: 'hero_data.h3_notes' },
  { id: 'h4', name: 'Evan Rogers', role: 'DPS', type: 'Beam', tier: 'S', notes: 'hero_data.h4_notes' },
  { id: 'h5', name: 'Lily', role: 'Crowd Control', type: 'Ion', tier: 'S', notes: 'hero_data.h5_notes' },

  // A-Tier
  { id: 'h6', name: 'Aliya', role: 'Buffer', type: 'Beam', tier: 'A', notes: 'hero_data.h6_notes' },
  { id: 'h7', name: 'Jodie Beart', role: 'Buffer', type: 'Ion', tier: 'A', notes: 'hero_data.h7_notes' },
  { id: 'h8', name: 'Cocoon', role: 'Tank/Support', type: 'Ion', tier: 'A', notes: 'hero_data.h8_notes' },
  { id: 'h9', name: 'Doug Rockwell', role: 'Healer', type: 'Beam', tier: 'A', notes: 'hero_data.h9_notes' },
];

export const shipDecks = [
  {
    id: 'kinetic_meta',
    title: 'ship_decks.kinetic_meta_title',
    energyType: 'Kinetic',
    description: 'ship_decks.kinetic_meta_desc',
    slots: [
      { name: 'Eva von Trier', role: 'ship_decks.slot1_role_kinetic', reason: 'ship_decks.slot1_reason_kinetic' },
      { name: 'Zora Dominii', role: 'ship_decks.slot2_role_kinetic', reason: 'ship_decks.slot2_reason_kinetic' },
      { name: 'Killer Bee / Cocoon', role: 'ship_decks.slot3_role_kinetic', reason: 'ship_decks.slot3_reason_kinetic' }
    ]
  },
  {
    id: 'beam_meta',
    title: 'ship_decks.beam_meta_title',
    energyType: 'Beam',
    description: 'ship_decks.beam_meta_desc',
    slots: [
      { name: 'Aliya', role: 'ship_decks.slot1_role_beam', reason: 'ship_decks.slot1_reason_beam' },
      { name: 'Doug Rockwell', role: 'ship_decks.slot2_role_beam', reason: 'ship_decks.slot2_reason_beam' },
      { name: 'Evan Rogers', role: 'ship_decks.slot3_role_beam', reason: 'ship_decks.slot3_reason_beam' }
    ]
  },
  {
    id: 'ion_meta',
    title: 'ship_decks.ion_meta_title',
    energyType: 'Ion',
    description: 'ship_decks.ion_meta_desc',
    slots: [
      { name: 'Jodie Beart', role: 'ship_decks.slot1_role_ion', reason: 'ship_decks.slot1_reason_ion' },
      { name: 'Ajita', role: 'ship_decks.slot2_role_ion', reason: 'ship_decks.slot2_reason_ion' },
      { name: 'Lily', role: 'ship_decks.slot3_role_ion', reason: 'ship_decks.slot3_reason_ion' }
    ]
  }
];

export const groundTeams = [
  {
    id: 'early_game',
    title: 'ground_teams.early_game_title',
    description: 'ground_teams.early_game_desc',
    members: ['Warrior Hero', 'Sage Hero', 'Any DPS']
  },
  {
    id: 'mid_game',
    title: 'ground_teams.mid_game_title',
    description: 'ground_teams.mid_game_desc',
    members: ['Kama (DPS)', 'Doug (Heal)', 'Aris (Tank)']
  },
  {
    id: 'late_game',
    title: 'ground_teams.late_game_title',
    description: 'ground_teams.late_game_desc',
    members: ['Cocoon (Tank)', 'Eva von Trier (Support)', 'Zora Dominii (DPS)']
  }
];

export const eventsData = [
  {
    id: 'kaboom',
    title: 'events.kaboom_title',
    cycle: 'events.kaboom_cycle',
    type: 'events.kaboom_type',
    description: 'events.kaboom_desc',
    essentials: 'events.kaboom_essentials',
    teams: [
      {
        name: 'events.kaboom_team1_name',
        composition: ['Zora', 'Jodie', 'Kama'],
        note: 'events.kaboom_team1_note'
      },
      {
        name: 'events.kaboom_team2_name',
        composition: ['Evan', 'Lily', 'Zora'],
        note: ''
      }
    ],
    proTips: [
      {
        title: 'events.kaboom_protip1_title',
        content: 'events.kaboom_protip1_content'
      }
    ]
  },
  {
    id: 'arms_race',
    title: 'events.arms_race_title',
    cycle: 'events.arms_race_cycle',
    type: 'events.arms_race_type',
    description: 'events.arms_race_desc',
    essentials: 'events.arms_race_essentials',
    tactics: [
      { title: 'events.arms_race_morale', content: 'events.arms_race_morale_desc' },
      { title: 'events.arms_race_stage_a', content: 'events.arms_race_stage_a_location' },
      { title: 'events.arms_race_stage_b', content: 'events.arms_race_stage_b_flex' }
    ],
    infoGrid: {
      title: 'events.arms_race_morale',
      items: [
        { label: 'events.arms_race_morale_l1', value: '-10% Defense (Estimated)' },
        { label: 'events.arms_race_morale_l2', value: '-20% Defense (Estimated)' },
        { label: 'events.arms_race_morale_l3', value: '-30% Defense' }
      ]
    },
    dailyActions: [
      { focus: 'events.arms_race_stage_a', details: 'events.arms_race_stage_a_waves' },
      { focus: 'events.arms_race_stage_b', details: 'events.arms_race_stage_b_act' }
    ],
    proTips: [
      { title: 'events.arms_race_morale', content: 'events.arms_race_morale_warning' },
      { title: 'events.arms_race_stage_a_countdown', content: 'events.arms_race_stage_a_end' },
      { title: 'events.arms_race_stage_b_rewards', content: 'events.arms_race_stage_b_scale' }
    ]
  },
  {
    id: 'battle_trial',
    title: 'events.battle_trial_title',
    cycle: 'events.battle_trial_cycle',
    type: 'events.battle_trial_type',
    goldenRule: 'events.battle_trial_golden_rule',
    description: 'events.battle_trial_desc',
    infoGrid: {
      title: 'events.battle_trial_how_to',
      items: [
        { label: 'events.battle_trial_event_page', value: 'events.battle_trial_event_page_desc' },
        { label: 'events.battle_trial_quick_access', value: 'events.battle_trial_quick_access_desc' }
      ]
    }
  },
  {
    id: 'calamity',
    title: 'events.calamity_title',
    cycle: 'events.calamity_cycle',
    type: 'events.calamity_type',
    goldenRule: 'events.calamity_golden_rule',
    description: 'events.calamity_desc',
    dailyActions: [
      { focus: 'events.calamity_structure_waves', details: 'events.calamity_structure_waves_desc' },
      { focus: 'events.calamity_structure_diff', details: 'events.calamity_structure_diff_desc' },
      { focus: 'events.calamity_structure_obj', details: 'events.calamity_structure_obj_desc' },
      { focus: 'events.calamity_structure_lead', details: 'events.calamity_structure_lead_desc' }
    ],
    tactics: [
      { title: 'events.calamity_opt_fleet_title', content: 'events.calamity_opt_fleet_desc' },
      { title: 'events.calamity_opt_loc_title', content: 'events.calamity_opt_loc_desc' }
    ],
    proTips: [
      {
        title: 'events.calamity_location_title',
        content: 'events.calamity_location_desc'
      }
    ]
  },
  {
    id: 'crime_hunt',
    title: 'events.crime_hunt_title',
    cycle: 'events.crime_hunt_cycle',
    type: 'events.crime_hunt_type',
    description: 'events.crime_hunt_desc',
    dailyActions: [
      { focus: 'events.crime_hunt_loop_gather', details: 'events.crime_hunt_loop_gather_desc' },
      { focus: 'events.crime_hunt_loop_exchange', details: 'events.crime_hunt_loop_exchange_desc' },
      { focus: 'events.crime_hunt_loop_summon', details: 'events.crime_hunt_loop_summon_desc' }
    ],
    infoGrid: {
      title: 'events.crime_hunt_ark_title',
      items: [
        { label: 'events.crime_hunt_ark_location', value: 'events.crime_hunt_ark_location_desc' },
        { label: 'events.crime_hunt_ark_combat', value: 'events.crime_hunt_ark_combat_desc' },
        { label: 'events.crime_hunt_ark_diff', value: 'events.crime_hunt_ark_diff_desc' },
        { label: 'events.crime_hunt_ark_lifespan', value: 'events.crime_hunt_ark_lifespan_desc' },
        { label: 'events.crime_hunt_ark_bonus', value: 'events.crime_hunt_ark_bonus_desc' }
      ]
    },
    tactics: [
      { title: 'events.crime_hunt_opt_capacity', content: 'events.crime_hunt_opt_capacity_desc' },
      { title: 'events.crime_hunt_opt_early', content: 'events.crime_hunt_opt_early_desc' },
      { title: 'events.crime_hunt_opt_lvl', content: 'events.crime_hunt_opt_lvl_desc' },
      { title: 'events.crime_hunt_opt_hub', content: 'events.crime_hunt_opt_hub_desc' },
      { title: 'events.crime_hunt_opt_limit', content: 'events.crime_hunt_opt_limit_desc' }
    ]
  },
  {
    id: 'starry_recruitment',
    title: 'events.starry_title',
    cycle: 'events.starry_cycle',
    type: 'events.starry_type',
    description: 'events.starry_desc',
    dailyActions: [
      { focus: 'events.starry_mech_elite', details: 'events.starry_mech_elite_desc' },
      { focus: 'events.starry_mech_acq', details: 'events.starry_mech_acq_desc' },
      { focus: 'events.starry_mech_freebie', details: 'events.starry_mech_freebie_desc' },
      { focus: 'events.starry_mech_refresh', details: 'events.starry_mech_refresh_desc' }
    ],
    tactics: [
      { title: 'events.starry_opt_tiers', content: 'events.starry_opt_tiers_desc' },
      { title: 'events.starry_opt_limit', content: 'events.starry_opt_limit_desc' },
      { title: 'events.starry_opt_eff', content: 'events.starry_opt_eff_desc' },
      { title: 'events.starry_opt_gen', content: 'events.starry_opt_gen_desc' },
      { title: 'events.starry_opt_cap', content: 'events.starry_opt_cap_desc' },
      { title: 'events.starry_opt_best', content: 'events.starry_opt_best_desc' }
    ]
  },
  {
    id: 'shadowfront',
    title: 'events.shadowfront_title',
    cycle: 'events.shadowfront_cycle',
    type: 'events.shadowfront_type',
    goldenRule: 'events.shadowfront_golden_rule',
    description: 'events.shadowfront_desc',
    infoGrid: {
      title: 'events.shadowfront_req_title',
      items: [
        { label: 'events.shadowfront_req_commerce', value: 'events.shadowfront_req_commerce_desc' },
        { label: 'events.shadowfront_req_player', value: 'events.shadowfront_req_player_desc' },
        { label: 'events.shadowfront_req_cap', value: 'events.shadowfront_req_cap_desc' },
        { label: 'events.shadowfront_req_combat', value: 'events.shadowfront_req_combat_desc' }
      ]
    },
    stages: [
      { title: 'events.shadowfront_stage1', description: 'events.shadowfront_stage1_desc' },
      { title: 'events.shadowfront_stage2', description: 'events.shadowfront_stage2_desc' },
      { title: 'events.shadowfront_stage3', description: 'events.shadowfront_stage3_desc' },
      { title: 'events.shadowfront_stage4', description: 'events.shadowfront_stage4_desc' }
    ],
    proTips: [
      { title: 'events.shadowfront_loc_outpost', content: 'events.shadowfront_loc_outpost_desc' },
      { title: 'events.shadowfront_loc_lesser', content: 'events.shadowfront_loc_lesser_desc' },
      { title: 'events.shadowfront_loc_central', content: 'events.shadowfront_loc_central_desc' }
    ],
    tactics: [
      { title: 'events.shadowfront_contrib', content: 'events.shadowfront_contrib_desc' },
      { title: 'events.shadowfront_signals', content: 'events.shadowfront_signals_desc' }
    ]
  },
  {
    id: 'gvg',
    title: 'events.gvg_title',
    cycle: 'events.gvg_cycle',
    type: 'events.gvg_type',
    warning: 'events.gvg_warning',
    goldenRule: 'events.gvg_golden_rule',
    description: 'events.gvg_desc',
    scoreGrid: [
      { tier: 1, values: [25000, 45000, 26000, 27000, 50000, 120000] },
      { tier: 2, values: [95400, 150000, 85000, 87500, 120000, 250000] },
      { tier: 3, values: [180000, 320000, 164000, 259000, 327000, 752000] },
      { tier: 4, values: [358000, 620000, 328000, 404000, 515000, 1232000] },
      { tier: 5, values: [525000, 820000, 525000, 650000, 1050000, 1572000] },
      { tier: 6, values: [1350000, 1560000, 920000, 1700000, 2280000, 2572000] },
      { tier: 7, values: [1650000, 2150000, 1710000, 2200000, 3800000, 3172000] },
      { tier: 8, values: [2120000, 3250000, 2420000, 3500000, 6570000, 4344000] },
      { tier: 9, values: [4000000, 8350000, 4380000, 5300000, 10240000, 8500000] },
    ],
    schedulePhases: [
      {
        title: 'events.gvg_phase1',
        events: [
          { time: '0:00 UTC', action: 'events.gvg_action_war_prism' },
          { time: '1:00 UTC', action: 'events.gvg_action_sec_war_prism' },
          { time: '10:00 UTC', action: 'events.gvg_action_port_battle' },
        ]
      },
      {
        title: 'events.gvg_phase2',
        events: [
          { time: '13:00 UTC', action: 'events.gvg_action_war_prism' },
          { time: '14:00 UTC', action: 'events.gvg_action_reset_kick' },
          { time: '22:00 UTC', action: 'events.gvg_action_port_battle' },
        ]
      }
    ],
    tactics: [
      { title: 'events.gvg_tactic1_title', content: 'events.gvg_tactic1_content' },
      { title: 'events.gvg_tactic2_title', content: 'events.gvg_tactic2_content' },
      { title: 'events.gvg_tactic3_title', content: 'events.gvg_tactic3_content' }
    ],
    dailyActions: [
      { focus: 'events.gvg_daily1_focus', details: 'events.gvg_daily1_details' },
      { focus: 'events.gvg_daily2_focus', details: 'events.gvg_daily2_details' },
      { focus: 'events.gvg_daily3_focus', details: 'events.gvg_daily3_details' },
      { focus: 'events.gvg_daily4_focus', details: 'events.gvg_daily4_details' },
      { focus: 'events.gvg_daily5_focus', details: 'events.gvg_daily5_details' },
      { focus: 'events.gvg_daily6_focus', details: 'events.gvg_daily6_details' }
    ],
    proTips: [
      {
        title: 'events.gvg_protip1_title',
        content: 'events.gvg_protip1_content'
      },
      {
        title: 'events.gvg_protip2_title',
        content: 'events.gvg_protip2_content'
      }
    ]
  },
  {
    id: 'top100_traders',
    title: 'events.top100_title',
    cycle: 'events.top100_cycle',
    type: 'events.top100_type',
    goldenRule: 'events.top100_golden_rule',
    description: 'events.top100_desc',
    dailyActions: [
      {
        focus: 'events.top100_day1_focus',
        details: 'events.top100_day1_details'
      },
      {
        focus: 'events.top100_day2_focus',
        details: 'events.top100_day2_details'
      },
      {
        focus: 'events.top100_day3_focus',
        details: 'events.top100_day3_details'
      },
      {
        focus: 'events.top100_day4_focus',
        details: 'events.top100_day4_details'
      },
      {
        focus: 'events.top100_day5_focus',
        details: 'events.top100_day5_details'
      },
      {
        focus: 'events.top100_day6_focus',
        details: 'events.top100_day6_details'
      }
    ],
    tactics: [
      { title: 'events.top100_tactic1_title', content: 'events.top100_tactic1_content' },
      { title: 'events.top100_tactic2_title', content: 'events.top100_tactic2_content' }
    ],
    proTips: [
      { title: 'events.top100_protip1_title', content: 'events.top100_protip1_content' },
      { title: 'events.top100_protip2_title', content: 'events.top100_protip2_content' },
      { title: 'events.top100_protip3_title', content: 'events.top100_protip3_content' }
    ]
  },
  {
    id: 'dominance',
    title: 'events.dominance_title',
    cycle: 'events.dominance_cycle',
    type: 'events.dominance_type',
    description: 'events.dominance_desc',
    schedule: [
      { label: 'Weekly', times: 'events.dominance_schedule_weekly' }
    ],
    tactics: [
      {
        title: 'events.dominance_tactic1_title',
        content: 'events.dominance_tactic1_content'
      },
      {
        title: 'events.dominance_tactic2_title',
        content: 'events.dominance_tactic2_content'
      }
    ],
    infoGrid: {
      title: 'events.dominance_titles_boosts',
      items: [
        { label: 'events.dominance_title1_label', value: 'Build/Research/Ship Speed +12.5%', note: 'events.dominance_title1_note' },
        { label: 'events.dominance_title2_label', value: 'Ship Building +20%, Resistance +5%', note: 'events.dominance_title2_note' },
        { label: 'events.dominance_title3_label', value: 'Damage +5%, Repair Speed +20%', note: 'events.dominance_title3_note' },
        { label: 'events.dominance_title4_label', value: 'Building Speed +20%, Research +10%', note: 'events.dominance_title4_note' },
        { label: 'events.dominance_title5_label', value: 'Research Speed +20%, Building +10%', note: 'events.dominance_title5_note' },
        { label: 'events.dominance_title6_label', value: 'Resources Output +50%, Trade Speed +10%', note: 'events.dominance_title6_note' }
      ]
    },
    proTips: [
      {
        title: 'events.dominance_protip1_title',
        content: 'events.dominance_protip1_content'
      },
      {
        title: 'events.dominance_protip2_title',
        content: 'events.dominance_protip2_content'
      },
      {
        title: 'events.dominance_protip3_title',
        content: 'events.dominance_protip3_content'
      }
    ]
  }
];
