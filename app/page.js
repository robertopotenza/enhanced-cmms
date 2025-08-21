'use client'

import { createClient } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export default function Home() {
  const [assets, setAssets] = useState([])
  const [workOrders, setWorkOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        
        // Test database connection
        const { data: assetsData, error: assetsError } = await supabase
          .from('assets')
          .select('*')
          .order('created_at', { ascending: false })
        
        if (assetsError) {
          console.error('Assets error:', assetsError)
          throw assetsError
        }
        
        const { data: workOrdersData, error: workOrdersError } = await supabase
          .from('work_orders')
          .select('*')
          .order('created_at', { ascending: false })
        
        if (workOrdersError) {
          console.error('Work orders error:', workOrdersError)
          throw workOrdersError
        }
        
        setAssets(assetsData || [])
        setWorkOrders(workOrdersData || [])
        setError(null)
      } catch (err) {
        console.error('Database error:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ color: '#333', marginBottom: '20px' }}>🔧 Enhanced CMMS</h1>
        <div style={{ 
          background: '#f0f8ff', 
          border: '1px solid #007cba', 
          color: '#007cba', 
          padding: '15px', 
          borderRadius: '8px' 
        }}>
          <p style={{ margin: 0 }}>⏳ Loading CMMS data...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ color: '#333', marginBottom: '20px' }}>🔧 Enhanced CMMS</h1>
        <div style={{ 
          background: '#fee', 
          border: '1px solid #fcc', 
          color: '#c33', 
          padding: '15px', 
          borderRadius: '8px',
          marginBottom: '20px'
        }}>
          <h3 style={{ margin: '0 0 10px 0' }}>❌ Database Connection Error</h3>
          <p style={{ margin: '0 0 10px 0' }}><strong>Error:</strong> {error}</p>
          <p style={{ margin: 0, fontSize: '14px' }}>
            Please check your Supabase configuration and ensure the database tables exist.
          </p>
        </div>
        
        <div style={{ 
          background: '#fff3cd', 
          border: '1px solid #ffeaa7', 
          color: '#856404', 
          padding: '15px', 
          borderRadius: '8px' 
        }}>
          <h4 style={{ margin: '0 0 10px 0' }}>🔧 Troubleshooting Steps:</h4>
          <ol style={{ margin: 0, paddingLeft: '20px' }}>
            <li>Verify Supabase URL and API key in environment variables</li>
            <li>Ensure 'assets' and 'work_orders' tables exist in your database</li>
            <li>Check Row Level Security (RLS) policies allow public access</li>
            <li>Verify your Supabase project is active and accessible</li>
          </ol>
        </div>
      </div>
    )
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ marginBottom: '30px', textAlign: 'center' }}>
        <h1 style={{ color: '#333', marginBottom: '10px', fontSize: '2.5rem' }}>🔧 Enhanced CMMS</h1>
        <p style={{ color: '#666', fontSize: '1.1rem', margin: 0 }}>
          Maintenance Management System - Simple, Effective, Mobile-Ready
        </p>
      </header>
      
      {/* Dashboard Stats */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '20px', 
        marginBottom: '30px' 
      }}>
        <div style={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
          color: 'white', 
          padding: '20px', 
          borderRadius: '12px',
          textAlign: 'center'
        }}>
          <h3 style={{ margin: '0 0 5px 0', fontSize: '2rem' }}>{assets.length}</h3>
          <p style={{ margin: 0, opacity: 0.9 }}>Total Assets</p>
        </div>
        
        <div style={{ 
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', 
          color: 'white', 
          padding: '20px', 
          borderRadius: '12px',
          textAlign: 'center'
        }}>
          <h3 style={{ margin: '0 0 5px 0', fontSize: '2rem' }}>{workOrders.length}</h3>
          <p style={{ margin: 0, opacity: 0.9 }}>Work Orders</p>
        </div>
        
        <div style={{ 
          background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', 
          color: 'white', 
          padding: '20px', 
          borderRadius: '12px',
          textAlign: 'center'
        }}>
          <h3 style={{ margin: '0 0 5px 0', fontSize: '2rem' }}>
            {workOrders.filter(wo => wo.status === 'open').length}
          </h3>
          <p style={{ margin: 0, opacity: 0.9 }}>Open Tasks</p>
        </div>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '30px' }}>
        {/* Assets Section */}
        <div style={{ 
          background: 'white', 
          border: '1px solid #e1e5e9', 
          borderRadius: '12px', 
          padding: '25px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ 
            color: '#333', 
            marginBottom: '20px', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '10px' 
          }}>
            🏭 Assets ({assets.length})
          </h2>
          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {assets.map((asset) => (
              <div key={asset.id} style={{ 
                borderLeft: '4px solid #007cba', 
                paddingLeft: '15px', 
                marginBottom: '15px',
                background: '#f8f9fa',
                padding: '15px 15px 15px 20px',
                borderRadius: '8px',
                transition: 'transform 0.2s ease',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => e.target.style.transform = 'translateX(5px)'}
              onMouseOut={(e) => e.target.style.transform = 'translateX(0px)'}
              >
                <h3 style={{ margin: '0 0 8px 0', color: '#333', fontSize: '1.1rem' }}>
                  {asset.name}
                </h3>
                <p style={{ margin: '0 0 10px 0', color: '#666', fontSize: '14px' }}>
                  📍 {asset.location || 'No location specified'}
                </p>
                <span style={{ 
                  display: 'inline-block', 
                  padding: '4px 12px', 
                  fontSize: '12px', 
                  background: asset.criticality === 'High' ? '#ffebee' : 
                             asset.criticality === 'Low' ? '#e8f5e8' : '#e3f2fd', 
                  color: asset.criticality === 'High' ? '#c62828' : 
                         asset.criticality === 'Low' ? '#2e7d32' : '#1976d2', 
                  borderRadius: '16px',
                  fontWeight: '500'
                }}>
                  {asset.criticality || 'Medium'} Priority
                </span>
              </div>
            ))}
            {assets.length === 0 && (
              <div style={{ 
                textAlign: 'center', 
                padding: '40px 20px', 
                color: '#999',
                background: '#f8f9fa',
                borderRadius: '8px',
                border: '2px dashed #dee2e6'
              }}>
                <p style={{ margin: '0 0 10px 0', fontSize: '1.1rem' }}>📦 No assets found</p>
                <p style={{ margin: 0, fontSize: '14px' }}>Add your first asset to get started</p>
              </div>
            )}
          </div>
        </div>

        {/* Work Orders Section */}
        <div style={{ 
          background: 'white', 
          border: '1px solid #e1e5e9', 
          borderRadius: '12px', 
          padding: '25px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ 
            color: '#333', 
            marginBottom: '20px', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '10px' 
          }}>
            🔧 Work Orders ({workOrders.length})
          </h2>
          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {workOrders.map((wo) => (
              <div key={wo.id} style={{ 
                borderLeft: '4px solid #4caf50', 
                paddingLeft: '15px', 
                marginBottom: '15px',
                background: '#f8f9fa',
                padding: '15px 15px 15px 20px',
                borderRadius: '8px',
                transition: 'transform 0.2s ease',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => e.target.style.transform = 'translateX(5px)'}
              onMouseOut={(e) => e.target.style.transform = 'translateX(0px)'}
              >
                <h3 style={{ margin: '0 0 8px 0', color: '#333', fontSize: '1.1rem' }}>
                  {wo.title}
                </h3>
                <p style={{ margin: '0 0 12px 0', color: '#666', fontSize: '14px' }}>
                  {wo.description || 'No description provided'}
                </p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <span style={{ 
                    display: 'inline-block', 
                    padding: '4px 12px', 
                    fontSize: '12px', 
                    background: wo.status === 'open' ? '#e8f5e8' : 
                               wo.status === 'in_progress' ? '#fff3e0' : '#f3e5f5', 
                    color: wo.status === 'open' ? '#2e7d32' : 
                           wo.status === 'in_progress' ? '#f57c00' : '#7b1fa2', 
                    borderRadius: '16px',
                    fontWeight: '500'
                  }}>
                    {wo.status === 'open' ? '🟢 Open' : 
                     wo.status === 'in_progress' ? '🟡 In Progress' : 
                     wo.status === 'completed' ? '✅ Completed' : wo.status || 'open'}
                  </span>
                  <span style={{ 
                    display: 'inline-block', 
                    padding: '4px 12px', 
                    fontSize: '12px', 
                    background: wo.priority === 'High' ? '#ffebee' : 
                               wo.priority === 'Low' ? '#e8f5e8' : '#e3f2fd', 
                    color: wo.priority === 'High' ? '#c62828' : 
                           wo.priority === 'Low' ? '#2e7d32' : '#1976d2', 
                    borderRadius: '16px',
                    fontWeight: '500'
                  }}>
                    {wo.priority || 'Medium'} Priority
                  </span>
                </div>
              </div>
            ))}
            {workOrders.length === 0 && (
              <div style={{ 
                textAlign: 'center', 
                padding: '40px 20px', 
                color: '#999',
                background: '#f8f9fa',
                borderRadius: '8px',
                border: '2px dashed #dee2e6'
              }}>
                <p style={{ margin: '0 0 10px 0', fontSize: '1.1rem' }}>📋 No work orders found</p>
                <p style={{ margin: 0, fontSize: '14px' }}>Create your first work order to get started</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Success Status */}
      <div style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
        color: 'white',
        padding: '20px', 
        borderRadius: '12px',
        textAlign: 'center'
      }}>
        <h3 style={{ margin: '0 0 10px 0' }}>🎉 CMMS Successfully Deployed!</h3>
        <p style={{ margin: '0 0 10px 0', opacity: 0.9 }}>
          Database connection successful • Assets: {assets.length} • Work Orders: {workOrders.length}
        </p>
        <p style={{ margin: 0, fontSize: '14px', opacity: 0.8 }}>
          Your Enhanced CMMS is now live and ready for maintenance management
        </p>
      </div>
    </div>
  )
}

