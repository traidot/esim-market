import AgentPriceList from '@/views/downstream/agents/detail/AgentPriceList'

const Page = ({ params }: { params: { id: string } }) => {
  return <AgentPriceList id={params.id} />
}

export default Page
