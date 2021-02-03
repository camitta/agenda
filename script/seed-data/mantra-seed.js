const {Mantra} = require('../../server/db/models')

const mantraData = [
  {mantra: 'Small steps towards big goals is progress.'},
  {mantra: 'Achieve great things with small steps.'},
  {mantra: "If it was easy, it wouldn't be worth it."},
  {mantra: 'Take the time to do things right'},
  {mantra: 'Life is short. Do things that matter.'},
  {mantra: 'It will get done.'},
  {mantra: "It always seems impossible until it's done."},
  {mantra: 'Productivity is never an accident.'},
  {mantra: "Look back at the past & marvel at how far you've come."},
  {mantra: 'Your mind is for having ideas, not holding them.'},
  {mantra: 'The secret of getting things done is to act.'},
  {mantra: 'You can do anything, but you can’t do everything.'},
  {mantra: 'Today you will make progress towards your goals.'},
  {mantra: 'Alone we can do so little. Together we can do so much.'},
  {mantra: 'Meet small goals every day.'},
  {mantra: 'Make time for yourself.'},
  {mantra: 'You got this.'},
  {mantra: "If the plan doesn't work, change the plan, not the goal."}
]

const seedMantra = async () => {
  await Promise.all(
    mantraData.map(mantra =>
      Mantra.create({
        mantra: mantra.mantra
      })
    )
  )
  console.log('Mantra seeded successfully!')
}

module.exports = seedMantra
