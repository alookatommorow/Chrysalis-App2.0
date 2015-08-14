var React = require('react');
var mui = require('material-ui');

var Team = React.createClass({

  render: function(){

    return (
      <div className="container row">
      <h4>Team</h4>
        <div className="row">

          <div className="small-12 medium-6 large-3 columns end">
            <img className='teampictures' src='https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAALKAAAAJDUwYmYxNWI2LTI1ZTAtNDJlMS1iZWRlLTQyZmFkZWMzYjIyMA.jpg'/>
            <h4><a className="gitlink" href="https://github.com/dannyshafer">Daniel Shafer</a></h4>
            <p className="bio">Rails developer, formerly business intelligence @ Kiva.org and front-end developer @ ReLISTO. Used clothing store mogul.</p>
          </div>

          <div className="small-12 medium-6 large-3 columns end">
            <img className='teampictures' src='https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAALxAAAAJDg1MmI1ZmQxLTU1MDktNDY0ZC05ZTMzLTkzN2JjZDY0MGYyMw.jpg'/>
            <h5><a className="gitlink" href="https://github.com/ryanau"> Ryan Au</a></h5>
            <p className="bio">Rails developer, formerly business intelligence @ Kiva.org and front-end developer @ ReLISTO. Used clothing store mogul.</p>
          </div>

          <div className="small-12 medium-6 large-3 columns end">
            <img className='teampictures' src='https://pbs.twimg.com/profile_images/585479016817291264/qlym0sGg.jpg'/>
            <h5><a className="gitlink" href="https://github.com/alookatommorow"> John Hess</a></h5>
            <p className="bio">Rails developer, formerly business intelligence @ Kiva.org and front-end developer @ ReLISTO. Used clothing store mogul.</p>
          </div>

          <div className="small-12 medium-6 large-3 columns end">
            <img className='teampictures' src='https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/5/005/071/36a/2e3c836.jpg'/>
            <h5><a className="gitlink" href="https://github.com/andrewdonato"> Andrew Donato</a></h5>
            <p className="bio">Full stack developer.  UC Irvine Grad.  Former Electrician, Nuclear Submariner.  Mostly amateur skateboarder.</p>
          </div>

        </div>
        <div className='culture small-12 medium-12 large-12'>
          <h3>Make it rain</h3>
          <p>
            Chrysalis is a fundamental analysis website that seeks suitable investments based loosely on stock valuation techniques by Benjamin Graham. Other services (particularly brokers) which take age and risk preference typically only return a suggested proportional mix of asset classes so that the user it dependent on their service to do the actual management of buying and selling. Chrysalis is dramatically more actionable as it suggests a mix but also offers specific securities which the user can then research further and buy through his/her preferred channel.
          </p>
        </div>
      </div>
    );
  },

});

module.exports = Team;