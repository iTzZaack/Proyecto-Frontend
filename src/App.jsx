import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import EventForm from './components/EventForm';
import SearchAndFilter from './components/SearchAndFilter';
import EventStats from './components/EventStats';
import EventList from './components/EventList';
import Footer from './components/Footer';

export default function App() {
  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem('cenestur_events');
    return saved ? JSON.parse(saved) : [];
  });

  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('Todas');
  const [editingEvent, setEditingEvent] = useState(null);

  useEffect(() => {
    localStorage.setItem('cenestur_events', JSON.stringify(events));
  }, [events]);

  const addEvent = (newEvent) => {
    setEvents([...events, { ...newEvent, id: Date.now() }]);
  };

  const updateEvent = (updatedEvent) => {
    setEvents(events.map((e) => (e.id === updatedEvent.id ? updatedEvent : e)));
  };

  const deleteEvent = (id) => {
    if (confirm('¿Estás seguro de eliminar este evento?')) {
      setEvents(events.filter((event) => event.id !== id));
    }
  };

  const registerAttendee = (id) => {
    setEvents(
      events.map((event) => {
        if (event.id === id && event.attendees < event.capacity) {
          return { ...event, attendees: event.attendees + 1 };
        }
        return event;
      })
    );
  };

  const unregisterAttendee = (id) => {
    setEvents(
      events.map((event) => {
        if (event.id === id && event.attendees > 0) {
          return { ...event, attendees: event.attendees - 1 };
        }
        return event;
      })
    );
  };

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(search.toLowerCase()) ||
      event.location.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = filterCategory === 'Todas' || event.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex min-h-screen flex-col justify-between bg-ink text-paper">
      <div>
        <Navbar />
        <main className="mx-auto max-w-6xl px-4 pb-12 pt-8">
          <EventStats events={events} />
          <EventForm
            key={editingEvent?.id ?? 'new'}
            onAddEvent={addEvent}
            onUpdateEvent={updateEvent}
            editingEvent={editingEvent}
            setEditingEvent={setEditingEvent}
          />
          <SearchAndFilter
            search={search}
            setSearch={setSearch}
            filterCategory={filterCategory}
            setFilterCategory={setFilterCategory}
          />
          <EventList
            events={filteredEvents}
            onRegister={registerAttendee}
            onUnregister={unregisterAttendee}
            onDelete={deleteEvent}
            onEdit={setEditingEvent}
          />
        </main>
      </div>
      <Footer />
    </div>
  );
}