'use client'

import { useParams } from 'next/navigation'
import AgentDebt from '@/views/downstream/agents/detail/AgentDebt'

const AgentDebtPage = () => {
  const params = useParams()
  return <AgentDebt id={params.id as string} />
}

export default AgentDebtPage
