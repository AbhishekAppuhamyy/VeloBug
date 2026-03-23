import DashboardLayout from '../../layouts/Dashboardlayout'

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="text-white">
        <h2 className="text-2xl font-bold mb-2">Welcome back! 👋</h2>
        <p className="text-gray-400">Your projects and tasks will appear here.</p>
      </div>
    </DashboardLayout>
  )
}