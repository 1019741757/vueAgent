const getters = {
  token: state => state.user.token,
  Id: state => state.user.Id,
  AgencyName: state => state.user.AgencyName,
  AgencyBalance: state => state.user.AgencyBalance,
  EarningOfPaying: state => state.user.EarningOfPaying,
  Special: state => state.user.Special,
  UnreadCount: state => state.user.UnreadCount,
}
export default getters
