import React from 'react'
import styled from 'styled-components'
import { selectGoalsMap } from '../../../../store/goalsSlice'
import { useAppDispatch, useAppSelector } from '../../../../store/hooks'
import {
  setContent as setContentRedux,
  setIsOpen as setIsOpenRedux,
  setType as setTypeRedux
} from '../../../../store/modalSlice'
import { Card } from '../../../components/Card'

type Props = { id: string }

export default function GoalCard(props: Props) {
  const dispatch = useAppDispatch()
  const goal = useAppSelector(selectGoalsMap)[props.id]

  const onClick = (event: React.MouseEvent) => {
    event.stopPropagation()
    dispatch(setContentRedux(goal))
    dispatch(setTypeRedux('Goal'))
    dispatch(setIsOpenRedux(true))
  }

  const asLocaleDateString = (date: Date) => new Date(date).toLocaleDateString()

  // Calculate progress percentage
  const progress = Math.min((goal.balance / goal.targetAmount) * 100, 100)

  return (
    <Container key={goal.id} onClick={onClick}>
      <GoalIcon>{goal.icon}</GoalIcon>
      <GoalName>{goal.name}</GoalName>
      <ProgressBar>
        <ProgressFill progress={progress} />
      </ProgressBar>
      <AmountsContainer>
        <CurrentAmount>${goal.balance.toLocaleString()}</CurrentAmount>
        <TargetAmount>${goal.targetAmount.toLocaleString()}</TargetAmount>
      </AmountsContainer>
      <TargetDate>Target: {asLocaleDateString(goal.targetDate)}</TargetDate>
    </Container>
  )
}

const Container = styled(Card)`
  display: flex;
  flex-direction: column;
  min-height: 180px;
  min-width: 180px;
  width: 33%;
  cursor: pointer;
  margin: 1rem;
  padding: 1.5rem;
  border-radius: 2rem;
  align-items: center;
  gap: 0.5rem;
`

const GoalIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 0.5rem;
`

const GoalName = styled.h3`
  font-size: 1.2rem;
  margin: 0;
  text-align: center;
`

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: #f0f0f0;
  border-radius: 4px;
  margin: 0.5rem 0;
`

const ProgressFill = styled.div<{ progress: number }>`
  width: ${props => props.progress}%;
  height: 100%;
  background: #4CAF50;
  border-radius: 4px;
`

const AmountsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 0.5rem 0;
`

const CurrentAmount = styled.span`
  font-weight: bold;
  color: #333;
`

const TargetAmount = styled.span`
  color: #666;
`

const TargetDate = styled.h4`
  color: rgba(174, 174, 174, 1);
  font-size: 0.9rem;
  margin: 0;
`