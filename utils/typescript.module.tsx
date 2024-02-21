import { Interface } from "readline";
import { StringLiteralLike } from "typescript";

export interface DepositTransaction {
  _id: string;
  method: string;
  method_url: string;
  transaction_id: string;
  initiated_at: string;
  username: string;
  user_id: string;
  deposit_amount: number;
  bonus: number;
  status: string;
  updated_at: string;
  deposit_slip: any;
  payable: number;
  after_deposit: number;
  wallet_amount: number;
  admin_response: string;
  user_details:[]
}

export interface WithdrawalTransaction {
  method: string;
  transaction_id: string;
  _id: string;
  initiated_at: string;
  username: string;
  user_id: string;
  withdraw_amount: number;
  status: string;
  bonus: number;
  updated_at: string;
  withdrawal_slip: string;
  payable: number;
  after_withdrawal: number;
  wallet_amount: number;
  admin_response: string;
}

export interface UserInterface {
  _id: string;
  first_name: string;
  last_name: string;
  username: string;
  password: string;
  user_id: string;
  email: string;
  state: string;
  phone: string;
  city: string;
  country: string;
  bank_name: string;
  bank_holder: string;
  account_number: string;
  ifsc_code: string;
  joined_at: string;
  updated_at: string;
  status: boolean;
  bet_supported: boolean;
  is_blocked: boolean;
  is_online: boolean;
  last_seen: string;
  profile_picture: string;
  referral_code: string;
  amount: number;
  email_verified?: String;
  exposure_limit: number;
  max_limit: number;
  min_limit: number;
  sms_verified: boolean;
  kyc_verified: boolean;
}

export interface TransactionsCount {
  approvedTransaction: number;
  pendingTransaction: number;
  rejectTransaction: number;
  allTransaction: number;
}

export interface BetHistory {
  _id?:string;
  user_id: string;
  username: string;
  question?: string;
  match_id: string;
  match_date: string;
  placed_at: string;
  event_name: string;
  event_type: string;
  league_id: string;
  match_name: string;
  bet_type: "back" | "lay";
  stake: number;
  rate: number;
  status?: "win" | "lose" | "refund" | "pending"|"void"|"running";
  bet_category?: "fancy" | "bookmaker" | "odds" | "toss";
  runner_name?: string;
  updated_at?: string;
  result_type?:string
}

export interface betsCount {
  loseBet: number;
  winBet: number;
  pendingBet: number;
  refundBet: number;
  allBet: number;
}

export interface Event {
  name: string; // Allowed values: "tennis", "soccer", "cricket"
  sport_id: string;
  market_count: number;
  updated_at: string; // Should be a valid date-time string, e.g., "2023-10-03 12:30 PM"
  status: true | false; // Allowed values: "active", "inactive"
  created_at: string; // Should be a valid date-time string, e.g., "2023-10-03 11:30 PM"
}

export interface Match {
  sport_id: string;
  match_id: string;
  league_id: string;
  match_name: string;
  league_name: string;
  odds: false | true;
  bookmaker: false | true;
  fancy: false | true;
  toss: false | true;
  result: "win" | "lose" | "refund" | "not" | "pending";
  status: boolean;
  match_odd_bit?: any[]; // You might want to define a specific type for match_odd_bit
  created_at?: string;
  updated_at?: string;
  open_date?: string;
  country_code?: string;
  scoreboard_id?: string;
  undeclared_markets?: string;
}

// for promotion

export interface PromotionData {
  admin_id: string;
  description: string;
  end_date: string;
  full_name: string;
  image_url: string;
  open_date: string;
  rules: string;
  timestamp: string;
  title: string;
  type: string;
  _id: string;
}

export interface Notification {
  _id: string;
  user_id: string;
  admin_id: string;
  full_name: string;
  username: string;
  email: string;
  amount: number;
  description: string;
  type: string;
  title: string;
  timestamp: string;
  category: string;
}

export interface BetSlip {
  _id: string;
  user_id: string;
  username: string;
  bet_category: string;
  match_id: string;
  match_date: string;
  placed_at: string;
  event_name: string;
  event_type: string;
  league_id: string;
  match_name: string;
  bet_type: string;
  stake: number;
  rate: number;
  status: string;
  runner_name: string;
}

export interface BetSlipGroup {
  matchCount: number;
  match_id: string;
  items: BetSlip[];
}

export interface Rules {
  _id: string;
  title: string;
  agree_policy: boolean;
  bet_max: number;
  bet_min: number;
  color: string;
  currency: string;
  currency_symbol: string;
  email_notification: boolean;
  email_verification: boolean;
  
  force_secure_password: boolean;
  force_ssl: boolean;
  max_profit: number;
  min_profit: number; // Adjust the type based on your actual requirements
  sms_notification: boolean;
  sms_verification: boolean;
  strong_password: boolean;
  timezone: string;
  user_registration: boolean;
  user_resistration: boolean; // Typo in the property name, assuming you meant 'user_registration'
  withdraw_max: number;
  withdraw_min: number;
  bet_timing: number;
}

export interface RulesRegulation {
  _id: string;
  stake_limit_min: number;
  stake_limit_max: number;
  max_profit: number;
  rules: string;
}

export interface Allbets {
  bet_category: string;
  bet_type: string;
  event_name: string;
  event_type: string;
  league_id: string;
  league_name: string;
  result:string;
  match_date: string;
  match_id: string;
  match_name: string;
  placed_at: string;
  rate: number;
  runner_name: string;
  stake: number;
  status: string;
  user_id: string;
  username: string;
  _id: string;
}

export interface AllTransaction {
  admin_response: string;
  after_deposit: number;
  bonus: number;
  deposit_amount: number;
  user_details:[];
  withdraw_amount: number;
  deposit_slip: string;
  initiated_at: string;
  method: string;
  payable: number;
  type: string;
  status: string;
  transaction_id: string;
  updated_at: string;
  user_id: string;
  username: string;
  wallet_amount: number;
  _id: string;
  admin_details: [];
}

interface FAQ {
  question: string;
  answer: string;
}

export interface LogoAndFav {
  _id: string;
  logo: string;
  fav_icon: string;
  marque: string;
  fnq: FAQ[];
  tc: string;
}

export interface GameProvider {
  gameProviderId: number;
  gameID: number;
  gameType: number;
  newGameType: number;
  rank: number;
  device: string;
  platform: string;
  provider: string;
  rows?: number;
  rtp?: number;
  reels?: number;
  lines?: number;
  gameInfos: {
    language: string;
    gameName: string;
    gameIconUrl: string;
  }[];
  supportedCurrencies: string[];
  blockCountries: string[];
  isMaintain: boolean;
  isEnabled: boolean;
  isProvideCommission: boolean;
  hasHedgeBet: boolean;
}

export interface GameProduct {
  gameId: number;
  gameName: string;
  device?: string[];
  image:string;
}

export interface CasinoProduct {
  productId: number;
  gameName: string;
  device?: string[]; // Changed 'Array' to 'string[]'
  image: string;
}