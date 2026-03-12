import React, { useState, useEffect } from 'react'
import LoadingSpinner from '../../../../components/common/LoadingSpinner/LoadingSpinner'
import Modal from '../../../../components/common/Modal/Modal'

const StaffManagement = () => {
  const [loading, setLoading] = useState(true)
  const [staff, setStaff] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [departmentFilter, setDepartmentFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [modalState, setModalState] = useState({ 
    add: false, 
    edit: false, 
    delete: false 
  })
  const [currentStaff, setCurrentStaff] = useState(null)
  const [formData, setFormData] = useState({
    name: '', role: '', email: '', phone: '', department: '', 
    shift: 'Morning (7AM-3PM)', address: '', emergencyContact: '', joiningDate: ''
  })

  // Data constants
  const STAFF_ROLES = ['Nurse', 'Receptionist', 'Lab Technician', 'Pharmacist', 'Ward Boy', 'Housekeeping', 'Security Guard', 'Accountant', 'IT Support', 'HR Manager']
  const DEPARTMENTS = ['Emergency', 'OPD', 'Lab', 'Pharmacy', 'ICU', 'Ward', 'Administration', 'HR', 'IT', 'Housekeeping']
  const SHIFT_OPTIONS = ['Morning (7AM-3PM)', 'Evening (3PM-11PM)', 'Night (11PM-7AM)', 'Flexible', 'Part-time']

  useEffect(() => { loadStaff() }, [])

  const loadStaff = async () => {
    setLoading(true)
    setTimeout(() => {
      setStaff([
        { id: 'STAFF-2001', name: 'Kavya Patel', role: 'Nurse', contact: '+91 98765 43214', shift: 'Morning (7AM-3PM)', department: 'Emergency', status: 'Active', image: 'https://i.pravatar.cc/100?img=5', email: 'kavya.patel@hospital.com', address: '123 Main St, Mumbai', emergencyContact: '+91 98765 43200', joiningDate: '2023-01-15' },
        { id: 'STAFF-2002', name: 'Arjun Kumar', role: 'Receptionist', contact: '+91 98765 43215', shift: 'Evening (3PM-11PM)', department: 'OPD', status: 'Active', image: 'https://i.pravatar.cc/100?img=6', email: 'arjun.kumar@hospital.com', address: '456 Park Ave, Delhi', emergencyContact: '+91 98765 43201', joiningDate: '2023-03-20' },
        { id: 'STAFF-2003', name: 'Priya Sharma', role: 'Lab Technician', contact: '+91 98765 43216', shift: 'Morning (7AM-3PM)', department: 'Lab', status: 'Active', image: 'https://i.pravatar.cc/100?img=7', email: 'priya.sharma@hospital.com', address: '789 MG Road, Bangalore', emergencyContact: '+91 98765 43202', joiningDate: '2023-02-10' },
        { id: 'STAFF-2004', name: 'Rahul Verma', role: 'Pharmacist', contact: '+91 98765 43217', shift: 'Night (11PM-7AM)', department: 'Pharmacy', status: 'Active', image: 'https://i.pravatar.cc/100?img=8', email: 'rahul.verma@hospital.com', address: '321 Central Ave, Chennai', emergencyContact: '+91 98765 43203', joiningDate: '2023-04-05' },
        { id: 'STAFF-2005', name: 'Anjali Desai', role: 'Nurse', contact: '+91 98765 43218', shift: 'Evening (3PM-11PM)', department: 'ICU', status: 'Active', image: 'https://i.pravatar.cc/100?img=9', email: 'anjali.desai@hospital.com', address: '654 Gandhi Road, Kolkata', emergencyContact: '+91 98765 43204', joiningDate: '2023-05-12' },
        { id: 'STAFF-2006', name: 'Vikram Singh', role: 'Security Guard', contact: '+91 98765 43219', shift: 'Night (11PM-7AM)', department: 'Security', status: 'Active', image: 'https://i.pravatar.cc/100?img=10', email: 'vikram.singh@hospital.com', address: '987 Nehru Nagar, Pune', emergencyContact: '+91 98765 43205', joiningDate: '2023-06-18' }
      ])
      setLoading(false)
    }, 1000)
  }

  // Modal handlers
  const openModal = (type, staffMember = null) => {
    setModalState(prev => ({ ...prev, [type]: true }))
    if (type === 'edit' && staffMember) {
      setCurrentStaff(staffMember)
      setFormData({
        name: staffMember.name, role: staffMember.role, email: staffMember.email,
        phone: staffMember.contact, department: staffMember.department, shift: staffMember.shift,
        address: staffMember.address, emergencyContact: staffMember.emergencyContact, 
        joiningDate: staffMember.joiningDate
      })
    } else if (type === 'delete' && staffMember) {
      setCurrentStaff(staffMember)
    }
  }

  const closeModal = (type) => {
    setModalState(prev => ({ ...prev, [type]: false }))
    if (type !== 'delete') resetForm()
    if (type === 'delete') setCurrentStaff(null)
  }

  // Core functions
  const handleAddStaff = () => {
    if (!validateForm()) return
    const staffMember = { 
      id: `STAFF-${Math.floor(2000 + Math.random() * 9000)}`,
      ...formData, contact: formData.phone, status: 'Active',
      image: `https://i.pravatar.cc/100?img=${Math.floor(Math.random() * 70) + 1}`
    }
    setStaff(prev => [staffMember, ...prev])
    closeModal('add')
  }

  const handleEditStaff = () => {
    if (!validateForm()) return
    setStaff(prev => prev.map(s => 
      s.id === currentStaff.id ? { ...s, ...formData, contact: formData.phone } : s
    ))
    closeModal('edit')
  }

  const handleToggleStatus = (staffId) => {
    setStaff(prev => prev.map(s => 
      s.id === staffId ? { ...s, status: s.status === 'Active' ? 'Inactive' : 'Active' } : s
    ))
  }

  const handleDeleteStaff = () => {
    setStaff(prev => prev.filter(s => s.id !== currentStaff.id))
    closeModal('delete')
  }

  const resetForm = () => {
    setFormData({
      name: '', role: '', email: '', phone: '', department: '', 
      shift: 'Morning (7AM-3PM)', address: '', emergencyContact: '', joiningDate: ''
    })
    setCurrentStaff(null)
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const validateForm = () => {
    const required = ['name', 'email', 'phone', 'role', 'department', 'shift', 'emergencyContact', 'joiningDate', 'address']
    const missing = required.find(field => !formData[field])
    if (missing) {
      alert(`Please fill in the ${missing} field`)
      return false
    }
    return true
  }

  // Filter staff
  const filteredStaff = staff.filter(staffMember => {
    const matchesSearch = !searchTerm || 
      [staffMember.name, staffMember.role, staffMember.department].some(field => 
        field.toLowerCase().includes(searchTerm.toLowerCase())
      )
    const matchesDepartment = !departmentFilter || staffMember.department === departmentFilter
    const matchesStatus = !statusFilter || staffMember.status === statusFilter
    return matchesSearch && matchesDepartment && matchesStatus
  })

  // Statistics
  const stats = [
    { 
      label: 'Total Staff', 
      value: staff.length, 
      color: 'blue',
      icon: 'fas fa-users',
      change: '+2 this month'
    },
    { 
      label: 'Nurses', 
      value: staff.filter(s => s.role === 'Nurse').length, 
      color: 'green',
      icon: 'fas fa-user-nurse',
      change: '+1 this month'
    },
    { 
      label: 'Technicians', 
      value: staff.filter(s => s.role === 'Lab Technician').length, 
      color: 'purple',
      icon: 'fas fa-microscope',
      change: 'No change'
    },
    { 
      label: 'Pharmacists', 
      value: staff.filter(s => s.role === 'Pharmacist').length, 
      color: 'orange',
      icon: 'fas fa-pills',
      change: '+1 this month'
    }
  ]

  if (loading) return <LoadingSpinner />

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Staff Management
            </h2>
            <p className="text-gray-500 mt-1">Manage and organize hospital staff members</p>
          </div>
          <button 
            onClick={() => openModal('add')}
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 font-medium"
          >
            <i className="fas fa-plus-circle text-lg"></i>
            <span>Add New Staff</span>
          </button>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            <input 
              type="text" 
              placeholder="Search staff by name, role or department..." 
              className="pl-12 pr-4 py-3 w-full border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <select 
              className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
            >
              <option value="">All Departments</option>
              {DEPARTMENTS.map(dept => <option key={dept} value={dept}>{dept}</option>)}
            </select>
            <select 
              className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Statistics - Matching Department Management Style */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map(({ label, value, color, icon, change }) => {
          const colorConfigs = {
            blue: { bg: 'bg-blue-50', text: 'text-blue-700', iconBg: 'bg-blue-100', iconColor: 'text-blue-500' },
            green: { bg: 'bg-green-50', text: 'text-green-700', iconBg: 'bg-green-100', iconColor: 'text-green-500' },
            purple: { bg: 'bg-purple-50', text: 'text-purple-700', iconBg: 'bg-purple-100', iconColor: 'text-purple-500' },
            orange: { bg: 'bg-orange-50', text: 'text-orange-700', iconBg: 'bg-orange-100', iconColor: 'text-orange-500' },
          }
          
          const config = colorConfigs[color] || colorConfigs.blue

          return (
            <div 
              key={label} 
              className={`${config.bg} p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${config.iconBg} p-3 rounded-xl`}>
                  <i className={`${icon} ${config.iconColor} text-xl`}></i>
                </div>
                <span className="text-sm font-medium px-3 py-1 bg-white rounded-full border border-gray-200">
                  {change}
                </span>
              </div>
              <div className={`text-4xl font-bold ${config.text} mb-2`}>{value}</div>
              <div className="text-gray-600">{label}</div>
              <div className="mt-4 h-1 w-full bg-white rounded-full overflow-hidden">
                <div className={`h-full ${config.iconBg} rounded-full`} style={{ width: '75%' }}></div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Staff Cards Title */}
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-800">All Staff Members ({filteredStaff.length})</h3>
        <div className="flex items-center gap-2 text-gray-500">
          <i className="fas fa-info-circle"></i>
          <span className="text-sm">Click on any staff member to view details</span>
        </div>
      </div>

      {/* Staff Grid - Compact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStaff.map(staffMember => (
          <StaffCard 
            key={staffMember.id} 
            staffMember={staffMember} 
            onEdit={() => openModal('edit', staffMember)}
            onToggleStatus={() => handleToggleStatus(staffMember.id)}
            onDelete={() => openModal('delete', staffMember)}
          />
        ))}
      </div>

      {filteredStaff.length === 0 && (
        <div className="text-center py-16 bg-gradient-to-br from-gray-50 to-white rounded-2xl border-2 border-dashed border-gray-200">
          <div className="w-20 h-20 mx-auto mb-6 bg-blue-50 rounded-full flex items-center justify-center">
            <i className="fas fa-users text-blue-500 text-3xl"></i>
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No staff members found</h3>
          <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
          <button 
            onClick={() => { setSearchTerm(''); setDepartmentFilter(''); setStatusFilter(''); }}
            className="text-blue-600 hover:text-blue-800 font-medium flex items-center justify-center gap-2 mx-auto"
          >
            <i className="fas fa-redo"></i>
            Reset filters
          </button>
        </div>
      )}

      {/* Modals */}
      <StaffFormModal
        isOpen={modalState.add}
        onClose={() => closeModal('add')}
        title="Add New Staff Member"
        onSubmit={handleAddStaff}
        formData={formData}
        onInputChange={handleInputChange}
        submitText="Create Staff"
        submitIcon="plus-circle"
        onCancel={() => closeModal('add')}
      />

      <StaffFormModal
        isOpen={modalState.edit}
        onClose={() => closeModal('edit')}
        title="Edit Staff Member"
        onSubmit={handleEditStaff}
        formData={formData}
        onInputChange={handleInputChange}
        submitText="Save Changes"
        submitIcon="save"
        onCancel={() => closeModal('edit')}
      />

      <DeleteConfirmationModal
        isOpen={modalState.delete}
        onClose={() => closeModal('delete')}
        onConfirm={handleDeleteStaff}
        name={currentStaff?.name}
        type="Staff"
      />
    </div>
  )
}

// Compact Staff Card Component
const StaffCard = ({ staffMember, onEdit, onToggleStatus, onDelete }) => {
  const statusConfig = {
    Active: { color: 'text-green-600', bg: 'bg-green-100', border: 'border-green-200', icon: 'fas fa-check-circle' },
    Inactive: { color: 'text-red-600', bg: 'bg-red-100', border: 'border-red-200', icon: 'fas fa-pause-circle' }
  }
  
  const status = statusConfig[staffMember.status] || statusConfig.Active
  
  const roleConfig = {
    Nurse: { bg: 'bg-blue-50', text: 'text-blue-600', icon: 'fas fa-user-nurse' },
    Receptionist: { bg: 'bg-purple-50', text: 'text-purple-600', icon: 'fas fa-headset' },
    'Lab Technician': { bg: 'bg-green-50', text: 'text-green-600', icon: 'fas fa-microscope' },
    Pharmacist: { bg: 'bg-orange-50', text: 'text-orange-600', icon: 'fas fa-pills' },
    'Security Guard': { bg: 'bg-gray-50', text: 'text-gray-600', icon: 'fas fa-shield-alt' },
    Housekeeping: { bg: 'bg-teal-50', text: 'text-teal-600', icon: 'fas fa-broom' },
    'Ward Boy': { bg: 'bg-indigo-50', text: 'text-indigo-600', icon: 'fas fa-hands-helping' },
    Accountant: { bg: 'bg-yellow-50', text: 'text-yellow-600', icon: 'fas fa-calculator' },
    'IT Support': { bg: 'bg-cyan-50', text: 'text-cyan-600', icon: 'fas fa-laptop-code' },
    'HR Manager': { bg: 'bg-pink-50', text: 'text-pink-600', icon: 'fas fa-user-tie' }
  }
  
  const roleStyle = roleConfig[staffMember.role] || { bg: 'bg-gray-50', text: 'text-gray-600', icon: 'fas fa-user' }
  
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-5 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-center gap-3 mb-4">
        <div className="relative">
          <img src={staffMember.image} className="w-12 h-12 rounded-full" alt="Staff" />
          <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white ${status.bg} flex items-center justify-center`}>
            <i className={`${status.icon} ${status.color} text-xs`}></i>
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-blue-700">{staffMember.name}</h3>
            <span className={`text-xs px-2 py-1 rounded-full ${status.bg} ${status.color}`}>
              {staffMember.status}
            </span>
          </div>
          <p className="text-xs text-gray-500">{staffMember.id}</p>
        </div>
      </div>
      
      <div className="space-y-3 text-sm text-gray-600 mb-4">
        <div className="flex justify-between">
          <span className="font-medium text-gray-700">Role:</span>
          <span className={`${roleStyle.text} font-medium`}>{staffMember.role}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-700">Department:</span>
          <span className="text-gray-900">{staffMember.department}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-700">Shift:</span>
          <span className="text-gray-900">{staffMember.shift}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-700">Contact:</span>
          <span className="text-gray-900">{staffMember.contact}</span>
        </div>
      </div>
      
      <div className="flex items-center justify-between pt-4 border-t">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${roleStyle.bg} ${roleStyle.text}`}>
          <i className={`${roleStyle.icon} mr-1`}></i>
          {staffMember.role}
        </span>
        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-50 transition-colors"
            title="Edit Staff"
          >
            <i className="fas fa-edit"></i>
          </button>
          <button
            onClick={onToggleStatus}
            className={`${staffMember.status === 'Active' ? 'text-yellow-600 hover:text-yellow-800 hover:bg-yellow-50' : 'text-green-600 hover:text-green-800 hover:bg-green-50'} p-2 rounded-full transition-colors`}
            title={staffMember.status === 'Active' ? 'Deactivate' : 'Activate'}
          >
            <i className={`fas fa-${staffMember.status === 'Active' ? 'pause' : 'play'}`}></i>
          </button>
          <button
            onClick={onDelete}
            className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-50 transition-colors"
            title="Delete Staff"
          >
            <i className="fas fa-trash"></i>
          </button>
        </div>
      </div>
    </div>
  )
}

// StaffFormModal component
const StaffFormModal = ({ 
  isOpen, 
  onClose, 
  title, 
  onSubmit, 
  formData, 
  onInputChange, 
  submitText, 
  submitIcon,
  onCancel
}) => (
  <Modal isOpen={isOpen} onClose={onClose} title={title} size="lg">
    <StaffForm 
      formData={formData} 
      onInputChange={onInputChange}
      onCancel={onCancel}
      onSubmit={onSubmit}
      submitText={submitText}
      submitIcon={submitIcon}
    />
  </Modal>
)

// StaffForm component - Updated to match Department Management style
const StaffForm = ({ formData, onInputChange, onCancel, onSubmit, submitText, submitIcon }) => {
  const STAFF_ROLES = ['Nurse', 'Receptionist', 'Lab Technician', 'Pharmacist', 'Ward Boy', 'Housekeeping', 'Security Guard', 'Accountant', 'IT Support', 'HR Manager']
  const DEPARTMENTS = ['Emergency', 'OPD', 'Lab', 'Pharmacy', 'ICU', 'Ward', 'Administration', 'HR', 'IT', 'Housekeeping']
  const SHIFT_OPTIONS = ['Morning (7AM-3PM)', 'Evening (3PM-11PM)', 'Night (11PM-7AM)', 'Flexible', 'Part-time']

  const formFields = [
    { type: 'text', name: 'name', label: 'Full Name *', placeholder: 'Enter full name', icon: 'fas fa-user' },
    { type: 'email', name: 'email', label: 'Email Address *', placeholder: 'staff@hospital.com', icon: 'fas fa-envelope' },
    { type: 'tel', name: 'phone', label: 'Phone Number *', placeholder: '+91 98765 43210', icon: 'fas fa-phone' },
    { type: 'tel', name: 'emergencyContact', label: 'Emergency Contact *', placeholder: '+91 98765 43210', icon: 'fas fa-phone-alt' },
  ]

  const selectFields = [
    { name: 'role', label: 'Role *', options: STAFF_ROLES, icon: 'fas fa-briefcase' },
    { name: 'department', label: 'Department *', options: DEPARTMENTS, icon: 'fas fa-building' },
    { name: 'shift', label: 'Shift Timing *', options: SHIFT_OPTIONS, icon: 'fas fa-clock' },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {formFields.map(field => (
          <div key={field.name} className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">{field.label}</label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <i className={field.icon}></i>
              </div>
              <input
                type={field.type}
                required
                value={formData[field.name]}
                onChange={(e) => onInputChange(field.name, e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder={field.placeholder}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {selectFields.map(field => (
          <div key={field.name} className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">{field.label}</label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10">
                <i className={field.icon}></i>
              </div>
              <select
                required
                value={formData[field.name]}
                onChange={(e) => onInputChange(field.name, e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="">Select {field.label.replace(' *', '')}</option>
                {field.options.map(option => <option key={option} value={option}>{option}</option>)}
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                <i className="fas fa-chevron-down"></i>
              </div>
            </div>
          </div>
        ))}
        
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">Joining Date *</label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <i className="fas fa-calendar-alt"></i>
            </div>
            <input
              type="date"
              required
              value={formData.joiningDate}
              onChange={(e) => onInputChange('joiningDate', e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
        <div className="relative">
          <div className="absolute left-3 top-3 text-gray-400">
            <i className="fas fa-map-marker-alt"></i>
          </div>
          <textarea
            rows="3"
            required
            value={formData.address}
            onChange={(e) => onInputChange('address', e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter complete address"
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-6 border-t">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-all duration-200 font-medium"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onSubmit}
          disabled={!formData.name || !formData.email || !formData.role || !formData.department}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-md hover:shadow-lg"
        >
          <i className={`fas fa-${submitIcon} mr-2`}></i>
          {submitText}
        </button>
      </div>
    </div>
  )
}

// DeleteConfirmationModal component - Matching Department Management style
const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, name, type }) => (
  <Modal isOpen={isOpen} onClose={onClose} title={`Delete ${type}`} size="md">
    <div className="text-center p-8">
      <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-red-50 to-pink-50 rounded-full flex items-center justify-center">
        <i className="fas fa-exclamation-triangle text-red-500 text-2xl"></i>
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-3">Are you sure?</h3>
      <p className="text-gray-600 mb-2">
        You are about to delete <span className="font-semibold text-gray-800">{name}</span>
      </p>
      <p className="text-sm text-gray-500 mb-8">
        This action will permanently remove the staff member and all associated data.
      </p>
      <div className="flex justify-center gap-4">
        <button 
          onClick={onClose}
          className="px-8 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-all duration-200 font-medium"
        >
          Cancel
        </button>
        <button 
          onClick={onConfirm}
          className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-200 font-medium shadow-md hover:shadow-lg"
        >
          <i className="fas fa-trash mr-2"></i>
          Delete Permanently
        </button>
      </div>
    </div>
  </Modal>
)

export default StaffManagement