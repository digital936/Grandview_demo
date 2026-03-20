

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import OwnerLayout from '../layouts/OwnerLayout';
import PropertyCard from '../components/PropertyCard';
import './MyProperties.css';

export default function MyProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOwnerProperties();
  }, []);

  async function fetchOwnerProperties() {
    try {
      setLoading(true);
      setError(null);

      // 1. Get logged-in user
      const { data: userData, error: authError } = await supabase.auth.getUser();
      
      if (authError || !userData?.user) {
        setError('User not authenticated');
        return;
      }

      const userId = userData.user.id;

      // 2. Get owner record
      const { data: owner, error: ownerError } = await supabase
        .from('owners')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (ownerError || !owner) {
        setError('Owner record not found');
        return;
      }

      // 3. Get property IDs from owner_properties
      const { data: ownerProps, error: relationError } = await supabase
        .from('owner_properties')
        .select('property_id')
        .eq('owner_id', owner.id);

      if (relationError) {
        setError('Failed to load property relations');
        return;
      }

      const propertyIds = (ownerProps || []).map(p => p.property_id);

      if (propertyIds.length === 0) {
        setProperties([]);
        return;
      }

      // 4. Fetch actual properties
      const { data: propertiesData, error: propertiesError } = await supabase
        .from('properties')
        .select('*')
        .in('id', propertyIds)
        .order('created_at', { ascending: false });

      if (propertiesError) {
        setError('Failed to load properties');
        return;
      }

      setProperties(propertiesData || []);

    } catch (err) {
      console.error('Error fetching properties:', err);
      setError('An error occurred while loading properties');
    } finally {
      setLoading(false);
    }
  }

  const handlePropertyClick = (property) => {
    navigate(`/owner/property/${property.id}`, { state: { property } });
  };

  return (
    <OwnerLayout>
      <div className="my-properties">

        <div className="my-properties-header">
          <div>
            <h1>My Properties</h1>
            <p>{properties.length} total properties</p>
          </div>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading properties...</p>
          </div>
        ) : properties.length === 0 ? (
          <div className="empty-state">
            <p>No properties assigned yet</p>
          </div>
        ) : (
          <div className="properties-grid">
            {properties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onClick={() => handlePropertyClick(property)}
              />
            ))}
          </div>
        )}

      </div>
    </OwnerLayout>
  );
}