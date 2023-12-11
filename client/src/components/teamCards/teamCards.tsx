import React from "react";
import "./teamCard.css";
import { ITeam } from "../../interfaces/team";
import EasternConferenceIcon from "../../assets/images/eastern.png";
import WesternConferenceICon from "../../assets/images/western.gif";

interface TeamCardProps {
  team: ITeam;
}

function TeamCard(props: TeamCardProps) {
  const { team } = props;

  return (
    <div className='team-card'>
      <div className='team-card-team-logo-row'>
        <img
          className='team-conference-card-logo'
          src={team.conference === 'east' ? EasternConferenceIcon: WesternConferenceICon}
          alt={'Logo for Eastern Conference'}
        />
        <img
          className='team-card-team-logo'
          src={team.logo}
          alt={`Logo for ${team.name}`}
        />
      </div>
      <div className='team-card-text-row'>
        &nbsp;
        <div className="team-name-text">#{team.rank} &nbsp;</div>
        <div className='team-name-text'>{team.name}</div>
        &nbsp; <span> - </span> &nbsp;
        <div className="team-name-text text-danger">{team.code}</div>
      </div>
      <div className="team-card-standings-row">
        &nbsp;
        <div className="team-name-text">{team.wins}</div>
        &nbsp; <span> - </span> &nbsp;
        <div className="team-name-text">{team.losses}</div>
      </div>
    </div>
  );
}
  

export default TeamCard;
