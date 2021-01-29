import {Mantra} from '../server/db/models'

const mantraData = [
  {mantra: 'To make small steps towards big goals, is progress'},
  {mantra: 'I will achieve great things, through small steps'},
  {mantra: 'If it was easy, it would not be worth it'},
  {mantra: 'Go slowly. Take the time to do things right'},
  {mantra: 'Great things are achieved thru small steps'},
  {mantra: 'It will get done'},
  {mantra: 'Morning sets the day'},
  {mantra: 'Every day is a new beginning'},
  {mantra: 'Look back at the past. Marvel at how far you have come'},
  {mantra: 'Stay focused and do one task at a time'},
  {mantra: "I can't do everything today, but I will take one small step"},
  {mantra: 'You can do anything, but you can’t do everything'},
  {mantra: 'Today I will make progress towards my goals'},
  {mantra: 'Understand and overcome procrastination'},
  {mantra: 'Achieve small goals every day'},
  {mantra: 'Making the time to organize yourself will save you time'},
  {mantra: 'Don’t try to do everything, or you may accomplish very little'},
  {mantra: 'More is not indicative of better'}
]

const mantraSeed = async () => {
  await Promise.all(
    mantraData.map(mantra =>
      Mantra.create({
        mantra: mantra.mantra
      })
    )
  )
}

export default mantraSeed
