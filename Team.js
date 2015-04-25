function Team (teamName, points, gamesLeft){
    this.teamName = teamName;
    this.points = points;
    this.gamesLeft = gamesLeft;
}

Team.prototype.clone = function(){
  var clonedTeam = new Team();
    clonedTeam.teamName = this.teamName;
    clonedTeam.points = this.points;
    clonedTeam.gamesLeft = this.gamesLeft;

    return clonedTeam;
};

module.exports = Team;