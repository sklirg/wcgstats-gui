import React, { Component } from 'react'

import Graph from '../components/Graph'

class GraphContainer extends Component {
  constructor() {
    super()
    this.state = {
      dates: [],
      fetching: false,
      lastLoaded: 0,
      teams: {},
    }
  }

  loadTeamStats() {
    let now = new Date()
    if (new Date(this.state.lastLoaded + (60 * 5 * 1000)) < now.getTime()) {
      this.props.teams.forEach(team => {
        fetch(this.props.apiRoot + "stats/" + team)
          .then(response => {
            this.setState({lastLoaded: new Date().getTime()})
            return response.json()
          })
          .then(response => {
            let dates = response.results.map(stats => {
              let d = {}
              d["team"] = team
              d["name"] = stats.date
              d[team + "Daily"] = stats.points
              return d
            })

            // Update stats for team
            let currentTeams = this.state.teams
            currentTeams[team] = dates
            this.mapReduceTeams(currentTeams)
          })
          .catch(err => {
            console.error("Err", err)
          })
      })
    }
  }

  mapReduceTeams(teams) {
    if (teams === undefined || teams.length < 1) {
      return
    }
    // Iterate over team keys and reduce days to a score object
    const scoreKeyMap = Object.keys(teams).reduce((scoreKeyMap, team) => {
      const teamObj = teams[team]
      teamObj.forEach(day => {
        const dayObj = scoreKeyMap[day.name] || {name: day.name}
        dayObj[team + 'Daily'] = day[team + 'Daily']
        scoreKeyMap[day.name] = dayObj
      })
      return scoreKeyMap
    }, [])

    // Map objects back to an array
    const dates = Object.keys(scoreKeyMap).map(key => {
      return scoreKeyMap[key]
    })

    // Sort them by date
    dates.sort((a, b) => {
      if (new Date(a.name) > new Date(b.name)) {
        return 1
      } else if (new Date(a.name) < new Date(b.name)) {
        return -1
      }
      return 0
    })
    this.setState({dates: dates})
    this.loadChallengeStats(dates)
  }

  loadChallengeStats(dates) {
    if (dates.length < 1 || Object.keys(this.state.teams).length < 1) {
      return
    }
    // Set the first total value equal to first daily value
    Object.keys(this.state.teams).forEach(team => {
      dates[0][team + 'Total'] = dates[0][team + 'Daily'] || 0
    })

    // Loop through all days and sum the total
    for (let i = 1; i < dates.length; i++) {
      Object.keys(this.state.teams).forEach(team => {
        let prevScore = dates[i - 1][team + 'Total']
        let currScore = dates[i][team + 'Daily'] || 0
        dates[i][team + 'Total'] = prevScore + currScore
      })
    }
    this.setState({dates: dates})
  }

  render() {
    // @ToDo: Make this load more logically
    this.loadTeamStats()
    const renderGraph = this.state.dates.length >= 1
    return (
      <div>
        { renderGraph ? <Graph dates={this.state.dates} /> : <p>Nothing to see here.</p> }
      </div>
    )
  }
}

export default GraphContainer
