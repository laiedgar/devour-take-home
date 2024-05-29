import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import "./CommunityLeaderboard.css";

interface LeaderboardData {
  _id: string;
  logo: string;
  name: string;
  totalMembers: number;
  totalExperience: number;
}

const CommunityLeaderboard = () => {
  const { data: leaderboard, isLoading: leaderboardLoading } = useQuery({
    queryKey: ['leaderboard'],
    queryFn: () => axios.get('http://localhost:8080/community/').then(res => res.data),
  });

  if (leaderboardLoading) return 'Loading...'

  const leaderboardDisplay = leaderboard.map((item: LeaderboardData, i: number) => {
    return <div className='leaderboard-grid-row'>
      <div>{i + 1}</div>
      <div className='community-name-container'><img src={item.logo} className='community-logo ' />{item.name}</div>
      <div>{item.totalMembers}</div>
      <div>{item.totalExperience}</div>
    </div>
  })

  return (
    <div className='leaderboard-container'>
      <h1>Top Community Leaderboard</h1>
      <div className='leaderboard-grid'>
        <div className='leaderboard-grid-header'><h2>Rank</h2><h2>Community</h2><h2># Of Members</h2><h2>Exp</h2></div>
        {leaderboardDisplay}
      </div>
    </div>)
}

export default CommunityLeaderboard