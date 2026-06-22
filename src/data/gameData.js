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
  // Combat
  {
    id: 'fleet-power', // New detailed guide
    category: 'combat',
    title: 'tips.fleet_power_title',
    content: 'tips.fleet_power_desc',
    highlight: true,
    hasDetails: true,
    publishDate: '2026-05-10T12:00:00Z',
    sections: [
      {
        text: 'tips.fleet_power_intro'
      },
      {
        header: 'tips.fleet_power_energy_types_hdr',
        text: 'tips.fleet_power_energy_types_txt'
      },
      {
        image: '/images/2.png'
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
        image: '/images/3.png'
      },
      {
        header: 'tips.fleet_power_components_hdr',
        text: 'tips.fleet_power_components_txt'
      },
      {
        image: '/images/4.png',
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

  // Economy
  {
    id: 't7-economy',
    category: 'economy',
    title: 'tips.t7_title',
    content: 'tips.t7_content',
    highlight: false,
    publishDate: '2026-04-01T00:00:00Z'
  },
  {
    id: 't8-economy',
    category: 'economy',
    title: 'tips.t8_title',
    content: 'tips.t8_content',
    highlight: true,
    publishDate: '2026-04-05T00:00:00Z'
  },

  // Guild
  {
    id: 'port-occupation',
    category: 'gameplay',
    title: 'tips.port_occ_title',
    content: 'tips.port_occ_desc',
    highlight: true,
    hasDetails: true,
    publishDate: '2026-05-15T12:00:00Z',
    sections: [
      {
        text: 'tips.port_occ_intro'
      },
      {
        header: 'tips.port_occ_declaring_hdr',
        text: 'tips.port_occ_declaring_txt'
      },
      {
        header: 'tips.port_occ_battle_hdr',
        text: 'tips.port_occ_battle_txt'
      },
      {
        header: 'tips.port_occ_rewards_hdr',
        text: 'tips.port_occ_rewards_txt'
      },
      {
        header: 'tips.port_occ_home_port_hdr',
        grid: {
          headers: ['tips.port_occ_home_port_tbl_c1', 'tips.port_occ_home_port_tbl_c2', 'tips.port_occ_home_port_tbl_c3', 'tips.port_occ_home_port_tbl_c4'],
          rows: [
            ['L1', '10', '0.02', 'L1'],
            ['L2', '16', '0.03', 'L2'],
            ['L3', '20', '0.03', 'L3'],
            ['L4', '26', '0.04', 'L4'],
            ['L5', '30', '0.05', 'L5'],
            ['L6', '36', '0.05', 'L6'],
            ['L7', '40', '0.06', 'L7'],
            ['L8', '40', '0.07', 'L8'],
            ['L9', '40', '0.08', 'L9']
          ]
        },
        note: 'tips.port_occ_home_port_claim'
      },
      {
        header: 'tips.port_occ_star_port_hdr',
        text: 'tips.port_occ_star_port_txt',
        grid: {
          headers: ['tips.port_occ_star_port_tbl_c1', 'tips.port_occ_star_port_tbl_c2', 'tips.port_occ_star_port_tbl_c3', 'tips.port_occ_star_port_tbl_c4'],
          rows: [
            ['L1', '2%', '0%', '0%'],
            ['L2', '0%', '3%', '0%'],
            ['L3', '0%', '0%', '4%'],
            ['L4', '5%', '0%', '0%'],
            ['L5', '0%', '5%', '0%'],
            ['L6', '0%', '0%', '7%'],
            ['L7', '7%', '0%', '7%'],
            ['L8', '0%', '7%', '7%'],
            ['L9', '10%', '10%', '0%']
          ]
        }
      },
      {
        header: 'tips.port_occ_losing_hdr',
        text: 'tips.port_occ_losing_txt'
      },
      {
        header: 'tips.port_occ_strategy_hdr',
        text: 'tips.port_occ_strategy_txt'
      },
      {
        header: 'tips.port_occ_final_hdr',
        text: 'tips.port_occ_final_txt',
        note: 'tips.port_occ_credit'
      }
    ]
  },
  {
    id: 'home-port',
    category: 'gameplay',
    title: 'tips.home_port_title',
    content: 'tips.home_port_desc',
    highlight: true,
    hasDetails: true,
    publishDate: '2026-05-20T12:00:00Z',
    sections: [
      {
        text: 'tips.home_port_intro'
      },
      {
        header: 'tips.home_port_purpose_hdr',
        text: 'tips.home_port_purpose_txt'
      },
      {
        header: 'tips.home_port_settlement_hdr',
        text: 'tips.home_port_settlement_txt',
        note: 'tips.home_port_settlement_note'
      },
      {
        header: 'tips.home_port_neutral_hdr',
        text: 'tips.home_port_neutral_txt'
      },
      {
        header: 'tips.home_port_nonneutral_hdr',
        text: 'tips.home_port_nonneutral_txt',
        note: 'tips.home_port_nonneutral_tip'
      },
      {
        header: 'tips.home_port_starport_hdr',
        text: 'tips.home_port_starport_txt'
      },
      {
        header: 'tips.home_port_buffs_hdr',
        text: 'tips.home_port_buffs_txt'
      },
      {
        header: 'tips.home_port_final_hdr',
        text: 'tips.home_port_final_txt',
        note: 'tips.home_port_credit'
      }
    ]
  },
  {
    id: 'vip-program',
    category: 'vip',
    title: 'tips.vip_program_title',
    content: 'tips.vip_program_desc',
    highlight: true,
    hasDetails: true,
    isExclusive: true,
    publishDate: '2026-06-06T14:39:00Z',
    sections: [
      {
        text: 'tips.vip_program_intro'
      },
      {
        header: 'tips.vip_program_what_is_hdr',
        text: 'tips.vip_program_what_is_txt'
      },
      {
        header: 'tips.vip_program_how_chosen_hdr',
        text: 'tips.vip_program_how_chosen_intro',
        methods: [
          { title: 'tips.vip_program_factor1_title', desc: 'tips.vip_program_factor1_desc', icon: 'Calendar' },
          { title: 'tips.vip_program_factor2_title', desc: 'tips.vip_program_factor2_desc', icon: 'Trophy' },
          { title: 'tips.vip_program_factor3_title', desc: 'tips.vip_program_factor3_desc', icon: 'Heart' },
          { title: 'tips.vip_program_factor4_title', desc: 'tips.vip_program_factor4_desc', icon: 'Coins' }
        ]
      },
      {
        header: 'tips.vip_program_perks_hdr',
        text: 'tips.vip_program_perks_intro',
        methods: [
          { title: 'tips.vip_program_perk1_title', desc: 'tips.vip_program_perk1_desc', icon: 'Gift' },
          { title: 'tips.vip_program_perk2_title', desc: 'tips.vip_program_perk2_desc', icon: 'Star' },
          { title: 'tips.vip_program_perk3_title', desc: 'tips.vip_program_perk3_desc', icon: 'Sparkles' },
          { title: 'tips.vip_program_perk4_title', desc: 'tips.vip_program_perk4_desc', icon: 'MessageSquare' },
          { title: 'tips.vip_program_perk5_title', desc: 'tips.vip_program_perk5_desc', icon: 'Crown' }
        ]
      },
      {
        header: 'tips.vip_program_takeaway_hdr',
        text: 'tips.vip_program_takeaway_txt'
      }
    ]
  },
  {
    id: 'magnetic-resistance',
    category: 'news',
    title: 'tips.magnetic_title',
    content: 'tips.magnetic_desc',
    highlight: true,
    hasDetails: true,
    isNew: true,
    publishDate: '2026-06-21T18:48:00Z',
    sections: [
      {
        text: 'tips.magnetic_intro'
      },
      {
        header: 'tips.magnetic_mechanic_hdr',
        text: 'tips.magnetic_mechanic_txt'
      },
      {
        header: 'tips.magnetic_rules_hdr',
        text: 'tips.magnetic_rules_txt'
      },
      {
        header: 'tips.magnetic_increase_hdr',
        text: 'tips.magnetic_increase_txt',
        methods: [
          { title: 'tips.magnetic_method1_title', desc: 'tips.magnetic_method1_desc', icon: 'Shield' },
          { title: 'tips.magnetic_method2_title', desc: 'tips.magnetic_method2_desc', icon: 'Home' },
          { title: 'tips.magnetic_method3_title', desc: 'tips.magnetic_method3_desc', icon: 'Crown' },
          { title: 'tips.magnetic_method4_title', desc: 'tips.magnetic_method4_desc', icon: 'Users' }
        ]
      },
      {
        header: 'tips.magnetic_buildings_hdr',
        text: 'tips.magnetic_buildings_txt'
      },
      {
        header: 'tips.magnetic_combat_hdr',
        text: 'tips.magnetic_combat_txt',
        combatTypes: [
          { title: 'tips.magnetic_combat1_title', desc: 'tips.magnetic_combat1_desc', icon: 'Swords' },
          { title: 'tips.magnetic_combat2_title', desc: 'tips.magnetic_combat2_desc', icon: 'Users' }
        ]
      },
      {
        header: 'tips.magnetic_settlement_hdr',
        text: 'tips.magnetic_settlement_txt'
      }
    ]
  },
  {
    id: 'star-of-the-guild',
    category: 'news',
    title: 'tips.star_of_guild_title',
    content: 'tips.star_of_guild_desc',
    highlight: true,
    hasDetails: true,
    isNew: true,
    publishDate: '2026-06-21T18:58:00Z',
    sections: [
      {
        text: 'tips.star_of_guild_intro'
      },
      {
        image: '/images/SOTG_1.png',
        imageMaxWidth: '320px'
      },
      {
        header: 'tips.star_of_guild_qualify_hdr',
        text: 'tips.star_of_guild_qualify_txt'
      },
      {
        header: 'tips.star_of_guild_rewards_hdr',
        text: 'tips.star_of_guild_rewards_txt'
      },
      {
        header: 'tips.star_of_guild_leader_hdr',
        text: 'tips.star_of_guild_leader_txt'
      }
    ]
  },
  {
    id: 'migration',
    category: 'news',
    title: 'tips.migration_title',
    content: 'tips.migration_desc',
    highlight: true,
    hasDetails: true,
    isUpdate: true,
    publishDate: '2026-06-06T14:58:00Z',
    sections: [
      {
        text: 'tips.migration_intro'
      },
      {
        header: 'tips.migration_status_hdr',
        text: 'tips.migration_status_txt'
      },
      {
        header: 'tips.migration_how_works_hdr',
        text: 'tips.migration_how_works_txt',
        quotas: [
          {
            tierName: 'tips.migration_tier_high_title',
            tierDesc: 'tips.migration_tier_high_desc',
            quotaDetails: [
              { label: 'tips.quota_ultra', value: 1, color: '#ff5b5b' },
              { label: 'tips.quota_high', value: 3, color: '#d4af37' },
              { label: 'tips.quota_mid', value: 30, color: '#4cd9c0' },
              { label: 'tips.quota_low', value: 40, color: '#888888' }
            ]
          },
          {
            tierName: 'tips.migration_tier_mid_title',
            tierDesc: 'tips.migration_tier_mid_desc',
            quotaDetails: [
              { label: 'tips.quota_ultra', value: 2, color: '#ff5b5b' },
              { label: 'tips.quota_high', value: 5, color: '#d4af37' },
              { label: 'tips.quota_mid', value: 40, color: '#4cd9c0' },
              { label: 'tips.quota_low', value: 60, color: '#888888' }
            ]
          },
          {
            tierName: 'tips.migration_tier_low_title',
            tierDesc: 'tips.migration_tier_low_desc',
            quotaDetails: [
              { label: 'tips.quota_ultra', value: 3, color: '#ff5b5b' },
              { label: 'tips.quota_high', value: 8, color: '#d4af37' },
              { label: 'tips.quota_mid', value: 60, color: '#4cd9c0' },
              { label: 'tips.quota_low', value: 80, color: '#888888' }
            ]
          }
        ]
      },
      {
        header: 'tips.migration_reqs_hdr',
        text: 'tips.migration_reqs_txt'
      },
      {
        header: 'tips.migration_effects_hdr',
        text: 'tips.migration_effects_txt'
      },
      {
        header: 'tips.migration_stages_hdr',
        text: 'tips.migration_stages_txt',
        stages: [
          { number: 1, name: 'tips.migration_stage1_title', desc: 'tips.migration_stage1_desc' },
          { number: 2, name: 'tips.migration_stage2_title', desc: 'tips.migration_stage2_desc' },
          { number: 3, name: 'tips.migration_stage3_title', desc: 'tips.migration_stage3_desc' },
          { number: 4, name: 'tips.migration_stage4_title', desc: 'tips.migration_stage4_desc' }
        ]
      }
    ]
  },
  {
    id: 'combat-math',
    credit: 'tips.credit_snakebite',
    category: 'combat',
    title: 'tips.combat_math_title',
    content: 'tips.combat_math_desc',
    highlight: true,
    hasDetails: true,
    publishDate: '2026-06-07T07:00:00Z',
    sections: [
      {
        header: 'tips.combat_math_timeline_hdr',
        text: 'tips.combat_math_timeline_txt'
      },
      {
        header: 'tips.combat_math_stats_hdr',
        text: 'tips.combat_math_stats_txt'
      },
      {
        header: 'tips.combat_math_cp_dr_hdr',
        text: 'tips.combat_math_cp_dr_txt'
      }
    ]
  },
  {
    id: 'gungir-guide',
    credit: 'tips.credit_snakebite',
    category: 'combat',
    title: 'tips.gungir_guide_title',
    content: 'tips.gungir_guide_desc',
    highlight: true,
    hasDetails: true,
    isNew: true,
    publishDate: '2026-06-07T07:10:00Z',
    sections: [
      {
        header: 'tips.gungir_guide_overview_hdr',
        text: 'tips.gungir_guide_overview_txt'
      },
      {
        header: 'tips.gungir_guide_mechanics_hdr',
        text: 'tips.gungir_guide_mechanics_txt'
      },
      {
        header: 'tips.gungir_guide_deployment_hdr',
        text: 'tips.gungir_guide_deployment_txt'
      }
    ]
  },
  {
    id: 'prismatic-cores',
    credit: 'tips.credit_snakebite',
    category: 'economy',
    title: 'tips.prismatic_cores_title',
    content: 'tips.prismatic_cores_desc',
    highlight: true,
    hasDetails: true,
    publishDate: '2026-06-07T07:02:00Z',
    sections: [
      {
        header: 'tips.prismatic_cores_overview_hdr',
        text: 'tips.prismatic_cores_overview_txt'
      },
      {
        header: 'tips.prismatic_cores_attempt_hdr',
        text: 'tips.prismatic_cores_attempt_txt'
      },
      {
        header: 'tips.prismatic_cores_strategy_hdr',
        text: 'tips.prismatic_cores_strategy_txt'
      }
    ]
  },
  {
    id: 'guild-vouchers',
    credit: 'tips.credit_snakebite',
    category: 'economy',
    title: 'tips.guild_vouchers_title',
    content: 'tips.guild_vouchers_desc',
    highlight: false,
    hasDetails: true,
    publishDate: '2026-06-07T07:03:00Z',
    sections: [
      {
        header: 'tips.guild_vouchers_overview_hdr',
        text: 'tips.guild_vouchers_overview_txt'
      },
      {
        header: 'tips.guild_vouchers_farm_hdr',
        text: 'tips.guild_vouchers_farm_txt'
      }
    ]
  },
  {
    id: 'resource-priority',
    credit: 'tips.credit_snakebite',
    category: 'economy',
    title: 'tips.resource_priority_title',
    content: 'tips.resource_priority_desc',
    highlight: false,
    hasDetails: true,
    publishDate: '2026-06-07T07:04:00Z',
    sections: [
      {
        header: 'tips.resource_priority_standard_hdr',
        text: 'tips.resource_priority_standard_txt'
      },
      {
        header: 'tips.resource_priority_premium_hdr',
        text: 'tips.resource_priority_premium_txt'
      }
    ]
  },
  {
    id: 'building-priority',
    credit: 'tips.credit_snakebite',
    category: 'economy',
    title: 'tips.building_priority_title',
    content: 'tips.building_priority_desc',
    highlight: false,
    hasDetails: true,
    publishDate: '2026-06-07T07:05:00Z',
    sections: [
      {
        header: 'tips.building_priority_critical_hdr',
        text: 'tips.building_priority_critical_txt'
      },
      {
        header: 'tips.building_priority_important_hdr',
        text: 'tips.building_priority_important_txt'
      }
    ]
  },
  {
    id: 'home-port-repair',
    credit: 'tips.credit_snakebite',
    category: 'gameplay',
    title: 'tips.home_port_repair_title',
    content: 'tips.home_port_repair_desc',
    highlight: true,
    hasDetails: true,
    publishDate: '2026-06-07T07:06:00Z',
    sections: [
      {
        header: 'tips.home_port_repair_overview_hdr',
        text: 'tips.home_port_repair_overview_txt'
      }
    ]
  },
  {
    id: 'build-queue-trick',
    credit: 'tips.credit_snakebite',
    category: 'economy',
    title: 'tips.build_queue_trick_title',
    content: 'tips.build_queue_trick_desc',
    highlight: true,
    hasDetails: true,
    publishDate: '2026-06-07T07:07:00Z',
    sections: [
      {
        header: 'tips.build_queue_trick_overview_hdr',
        text: 'tips.build_queue_trick_overview_txt'
      }
    ]
  }
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
    members: ['Cocoon', 'Doug Rockwell', 'Klara']
  },
  {
    id: 'mid_game',
    title: 'ground_teams.mid_game_title',
    description: 'ground_teams.mid_game_desc',
    members: ['Cocoon', 'Doug Rockwell', 'Zora Dominii']
  },
  {
    id: 'late_game',
    title: 'ground_teams.late_game_title',
    description: 'ground_teams.late_game_desc',
    members: ['Zora Dominii', 'Lily', 'Evan Rogers']
  }
];

export const eventsData = [
  {
    id: 'operation_blackout',
    credit: 'tips.credit_snakebite',
    title: 'events.operation_blackout_title',
    cycle: 'events.operation_blackout_cycle',
    type: 'events.operation_blackout_type',
    goldenRule: 'events.operation_blackout_golden_rule',
    description: 'events.operation_blackout_desc',
    stages: [
      { title: 'events.operation_blackout_stage_1_title', description: 'events.operation_blackout_stage_1_desc' },
      { title: 'events.operation_blackout_stage_2_title', description: 'events.operation_blackout_stage_2_desc' },
      { title: 'events.operation_blackout_stage_3_title', description: 'events.operation_blackout_stage_3_desc' },
      { title: 'events.operation_blackout_stage_4_title', description: 'events.operation_blackout_stage_4_desc' }
    ],
    infoGrid: {
      title: 'events.operation_blackout_region_progression_title',
      items: [
        { label: 'events.operation_blackout_region_early_label', value: 'events.operation_blackout_region_early_val' },
        { label: 'events.operation_blackout_region_mid_label', value: 'events.operation_blackout_region_mid_val' },
        { label: 'events.operation_blackout_region_late_label', value: 'events.operation_blackout_region_late_val' }
      ]
    },
    rewards: [
      { label: 'events.operation_blackout_reward_kill_label', value: 'events.operation_blackout_reward_kill_value' },
      { label: 'events.operation_blackout_reward_bonus_label', value: 'events.operation_blackout_reward_bonus_value' },
      { label: 'events.operation_blackout_reward_discoverer_label', value: 'events.operation_blackout_reward_discoverer_value' }
    ],
    dailyActions: [
      { focus: 'events.operation_blackout_daily_bonus_focus', details: 'events.operation_blackout_daily_bonus_desc' },
      { focus: 'events.operation_blackout_daily_discoverer_focus', details: 'events.operation_blackout_daily_discoverer_desc' }
    ],
    tactics: [
      { title: 'events.operation_blackout_tips_solo', content: 'events.operation_blackout_tips_solo_desc' },
      { title: 'events.operation_blackout_tips_comp', content: 'events.operation_blackout_tips_comp_desc' },
      { title: 'events.operation_blackout_tips_guild', content: 'events.operation_blackout_tips_guild_desc' }
    ],
    proTips: [
      { title: 'events.operation_blackout_protip1_title', content: 'events.operation_blackout_protip1_content' },
      { title: 'events.operation_blackout_protip2_title', content: 'events.operation_blackout_protip2_content' }
    ]
  },
  {
    id: 'kaboom',
    credit: 'tips.credit_snakebite',
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
    credit: 'tips.credit_snakebite',
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
    credit: 'tips.credit_snakebite',
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
    credit: 'tips.credit_snakebite',
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
  },
  {
    id: 'dominion_war_zone',
    title: 'events.dominion_war_zone_title',
    cycle: 'events.dominion_war_zone_cycle',
    type: 'events.dominion_war_zone_type',
    warning: 'events.dominion_war_zone_warning',
    description: 'events.dominion_war_zone_desc',
    image: '/images/DominionWarzone1.png',
    schedule: [
      { label: 'events.dominion_war_zone_schedule_d15', times: 'events.dominion_war_zone_schedule_d15_action' },
      { label: 'events.dominion_war_zone_schedule_d6', times: 'events.dominion_war_zone_schedule_d6_action' },
      { label: 'events.dominion_war_zone_schedule_d7', times: 'events.dominion_war_zone_schedule_d7_action' }
    ],
    stages: [
      { title: 'events.dominion_war_zone_phase1_title', description: 'events.dominion_war_zone_phase1_desc' },
      { title: 'events.dominion_war_zone_phase2_title', description: 'events.dominion_war_zone_phase2_desc', image: '/images/DominionWarzone2.png' },
      { title: 'events.dominion_war_zone_phase3_title', description: 'events.dominion_war_zone_phase3_desc' }
    ],
    tactics: [
      { title: 'events.dominion_war_zone_garrison_overview_title', content: 'events.dominion_war_zone_garrison_overview_desc', image: '/images/DominionWarzone3.png' },
      { title: 'events.dominion_war_zone_garrison_types_title', content: 'events.dominion_war_zone_garrison_types_desc', image: '/images/DominionWarzone4.png' },
      { title: 'events.dominion_war_zone_garrison_rules_title', content: 'events.dominion_war_zone_garrison_rules_desc', image: '/images/DominionWarzone5.png' },
      { title: 'events.dominion_war_zone_anti_lag_title', content: 'events.dominion_war_zone_anti_lag_desc' },
      { title: 'events.dominion_war_zone_loss_comp_title', content: 'events.dominion_war_zone_loss_comp_desc' }
    ],
    proTips: [
      { title: 'events.dominion_war_zone_strategy_prep_title', content: 'events.dominion_war_zone_strategy_prep_desc' },
      { title: 'events.dominion_war_zone_strategy_battle_title', content: 'events.dominion_war_zone_strategy_battle_desc' }
    ],
    infoGrid: {
      title: 'events.dominion_war_zone_qr_title',
      items: [
        { label: 'events.dominion_war_zone_qr_duration', value: 'events.dominion_war_zone_qr_duration_val' },
        { label: 'events.dominion_war_zone_qr_cap', value: 'events.dominion_war_zone_qr_cap_val' },
        { label: 'events.dominion_war_zone_qr_prep', value: 'events.dominion_war_zone_qr_prep_val' },
        { label: 'events.dominion_war_zone_qr_battle', value: 'events.dominion_war_zone_qr_battle_val' },
        { label: 'events.dominion_war_zone_qr_contest', value: 'events.dominion_war_zone_qr_contest_val' },
        { label: 'events.dominion_war_zone_qr_jump_cd', value: 'events.dominion_war_zone_qr_jump_cd_val' },
        { label: 'events.dominion_war_zone_qr_jump_req', value: 'events.dominion_war_zone_qr_jump_req_val' },
        { label: 'events.dominion_war_zone_qr_win', value: 'events.dominion_war_zone_qr_win_val' },
        { label: 'events.dominion_war_zone_qr_loss', value: 'events.dominion_war_zone_qr_loss_val' },
        { label: 'events.dominion_war_zone_qr_leaders', value: 'events.dominion_war_zone_qr_leaders_val' }
      ]
    }
  },
  {
    id: 'united_frontline',
    title: 'events.united_frontline_title',
    status: 'suspended',
    cycle: 'events.united_frontline_cycle',
    type: 'events.united_frontline_type',
    description: 'events.united_frontline_desc',
    publishDate: '2026-04-13T00:01:00+02:00',
    image: '/images/EventPortal.png',
    infoGrid: {
      title: 'events.united_frontline_schedule_title',
      items: [
        { label: 'events.united_frontline_schedule_occurrence', value: 'events.united_frontline_schedule_occurrence_desc' },
        { label: 'events.united_frontline_schedule_cadence', value: 'events.united_frontline_schedule_cadence_desc' },
        { label: 'events.united_frontline_schedule_req', value: 'events.united_frontline_schedule_req_desc' }
      ]
    },
    rewards: [
      { label: 'events.united_frontline_reward_f2p_label', value: 'events.united_frontline_reward_f2p_value' },
      { label: 'events.united_frontline_reward_monthly_label', value: 'events.united_frontline_reward_monthly_value' },
      { label: 'events.united_frontline_reward_assist_label', value: 'events.united_frontline_reward_assist_value' }
    ],
    stagesImage: '/images/ImmortalAscendencyShrineModel.png',
    stages: [
      { title: 'events.united_frontline_phase1', description: 'events.united_frontline_phase1_desc' },
      { title: 'events.united_frontline_phase2', description: 'events.united_frontline_phase2_desc', image: '/images/PilgrimGuards.png' },
      { title: 'events.united_frontline_phase3', description: 'events.united_frontline_phase3_desc', image: '/images/FaithBarrier.png' }
    ],
    tactics: [
      { title: 'events.united_frontline_tactic_respawn', content: 'events.united_frontline_tactic_respawn_desc' },
      { title: 'events.united_frontline_tactic_rating', content: 'events.united_frontline_tactic_rating_desc' }
    ],
    proTips: [
      { title: 'events.united_frontline_protip_strategy', content: 'events.united_frontline_protip_strategy_desc' }
    ]
  },
  {
    id: 'mothers_day',
    title: 'events.mothers_day_title',
    isLimited: true,
    publishDate: '2026-05-03T00:01:00+02:00',
    cycle: 'events.mothers_day_cycle',
    type: 'events.mothers_day_type',
    description: 'events.mothers_day_desc',
    image: '/images/MDE1.jpg',
    infoGrid: {
      title: 'events.mothers_day_schedule_title',
      items: [
        { label: 'events.mothers_day_schedule_servers_a_label', value: 'events.mothers_day_schedule_servers_a_value' },
        { label: 'events.mothers_day_schedule_servers_b_label', value: 'events.mothers_day_schedule_servers_b_value' },
        { label: 'events.mothers_day_schedule_reset_label', value: 'events.mothers_day_schedule_reset_value' }
      ]
    },
    stagesTitle: 'events.mothers_day_activities_title',
    stagesImage: '/images/MDE2.png',
    stages: [
      { title: 'events.mothers_day_activity_floral_title', description: 'events.mothers_day_activity_floral_desc' },
      { title: 'events.mothers_day_activity_exchange_title', description: 'events.mothers_day_activity_exchange_desc' },
      { title: 'events.mothers_day_activity_box_title', description: 'events.mothers_day_activity_box_desc' },
      { title: 'events.mothers_day_activity_surprise_title', description: 'events.mothers_day_activity_surprise_desc' },
      { title: 'events.mothers_day_activity_market_title', description: 'events.mothers_day_activity_market_desc' }
    ],
    tacticsTitle: 'events.mothers_day_cosmetics_title',
    tactics: [
      { title: 'events.mothers_day_cosmetic_skin_title', content: 'events.mothers_day_cosmetic_skin_desc', image: '/images/MDE_flagship_skin.png' },
      { title: 'events.mothers_day_cosmetic_kill_title', content: 'events.mothers_day_cosmetic_kill_desc', image: '/images/MDE_kill_effect.png' },
      { title: 'events.mothers_day_cosmetic_frame_title', content: 'events.mothers_day_cosmetic_frame_desc', image: '/images/MDE_frame.png' }
    ],
    rewardsRevealAt: '2026-05-05T00:00:00+02:00',
    rewards: [
      { label: 'events.mothers_day_reward_carnations_label', value: 'events.mothers_day_reward_carnations_value' },
      { label: 'events.mothers_day_reward_petals_label', value: 'events.mothers_day_reward_petals_value' },
      { label: 'events.mothers_day_reward_boxes_label', value: 'events.mothers_day_reward_boxes_value' }
    ],
    proTips: [
      { title: 'events.mothers_day_protip_daily_title', content: 'events.mothers_day_protip_daily_desc' },
      { title: 'events.mothers_day_protip_carnations_title', content: 'events.mothers_day_protip_carnations_desc' },
      { title: 'events.mothers_day_protip_gift_title', content: 'events.mothers_day_protip_gift_desc' }
    ]
  },
  {
    id: 'childrens_day',
    title: 'events.childrens_day_title',
    isLimited: true,
    publishDate: '2026-05-25T08:00:00Z',
    cycle: 'events.childrens_day_cycle',
    type: 'events.childrens_day_type',
    description: 'events.childrens_day_desc',
    infoGrid: {
      title: 'events.childrens_day_schedule_title',
      items: [
        { label: 'events.childrens_day_schedule_servers_a_label', value: 'events.childrens_day_schedule_servers_a_value' },
        { label: 'events.childrens_day_schedule_servers_b_label', value: 'events.childrens_day_schedule_servers_b_value' },
        { label: 'events.childrens_day_schedule_reset_label', value: 'events.childrens_day_schedule_reset_value' }
      ]
    },
    stagesTitle: 'events.childrens_day_activities_title',
    stagesImage: '/images/CDE2.png',
    stages: [
      { title: 'events.childrens_day_activity_checkin_title', description: 'events.childrens_day_activity_checkin_desc' },
      { title: 'events.childrens_day_activity_bingo_title', description: 'events.childrens_day_activity_bingo_desc' },
      { title: 'events.childrens_day_activity_battlepass_title', description: 'events.childrens_day_activity_battlepass_desc' },
      { title: 'events.childrens_day_activity_lottery_title', description: 'events.childrens_day_activity_lottery_desc' },
      { title: 'events.childrens_day_activity_chest_title', description: 'events.childrens_day_activity_chest_desc' },
      { title: 'events.childrens_day_activity_shop_title', description: 'events.childrens_day_activity_shop_desc', image: '/images/CDE3.png' },
      { title: 'events.childrens_day_activity_defense_title', description: 'events.childrens_day_activity_defense_desc' }
    ],
    tacticsTitle: 'events.childrens_day_rewards_title',
    tactics: [
      { title: 'events.childrens_day_reward_skin1_title', content: 'events.childrens_day_reward_skin1_desc', image: '/images/CDE_skin_fire.png' },
      { title: 'events.childrens_day_reward_skin2_title', content: 'events.childrens_day_reward_skin2_desc', image: '/images/CDE_skin_star.png' },
      { title: 'events.childrens_day_reward_frame_title', content: 'events.childrens_day_reward_frame_desc', image: '/images/CDE_frame.png' },
      { title: 'events.childrens_day_reward_chat_title', content: 'events.childrens_day_reward_chat_desc', image: '/images/CDE_chat.png' },
      { title: 'events.childrens_day_reward_nameplate_title', content: 'events.childrens_day_reward_nameplate_desc', image: '/images/CDE_nameplate.png' }
    ],
    proTips: [
      { title: 'events.childrens_day_protip_pass_title', content: 'events.childrens_day_protip_pass_desc' },
      { title: 'events.childrens_day_protip_unused_title', content: 'events.childrens_day_protip_unused_desc' },
      { title: 'events.childrens_day_protip_defense_title', content: 'events.childrens_day_protip_defense_desc' }
    ]
  },
  {
    id: 'trade_route_defense',
    credit: 'tips.credit_snakebite',
    title: 'events.trade_route_defense_title',
    cycle: 'events.trade_route_defense_cycle',
    type: 'events.trade_route_defense_type',
    description: 'events.trade_route_defense_desc',
    tactics: [
      { title: 'events.trade_route_defense_phases', content: 'events.trade_route_defense_phases_desc' }
    ],
    proTips: [
      { title: 'events.trade_route_defense_escort', content: 'events.trade_route_defense_escort_desc' }
    ]
  }
];
