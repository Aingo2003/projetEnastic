class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h1>
            <p className="text-gray-600 mb-4">We're sorry, but something unexpected happened.</p>
            <button
              onClick={() => window.location.reload()}
              className="btn btn-black"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  try {
    const [currentPage, setCurrentPage] = React.useState('home');
    const [user, setUser] = React.useState(null);
    const [events, setEvents] = React.useState([]);
    const [practices, setPractices] = React.useState([]);
    const [isAdmin, setIsAdmin] = React.useState(false);

    React.useEffect(() => {
      const savedUser = getStoredUser();
      if (savedUser) {
        setUser(savedUser);
        loadUserData(savedUser.email);
      }
      
      loadEventsFromDB();
      loadPracticesFromDB();
    }, []);

    const loadUserData = async (email) => {
      try {
        const users = await trickleListObjects('user', 10, true);
        const existingUser = users.items.find(u => u.objectData.email === email);
        if (existingUser) {
          setUser(prev => ({ ...prev, objectId: existingUser.objectId }));
        }
        
        // Check admin status
        const admins = await trickleListObjects('admin', 10, true);
        const adminUser = admins.items.find(a => a.objectData.email === email);
        setIsAdmin(!!adminUser);
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    };

    const loadEventsFromDB = async () => {
      try {
        const result = await trickleListObjects('event', 50, true);
        const eventsData = result.items.map(item => ({
          id: item.objectId,
          type: item.objectData.type,
          location: item.objectData.location,
          lat: item.objectData.latitude,
          lng: item.objectData.longitude,
          description: item.objectData.description,
          date: new Date(item.objectData.reportDate).toISOString().split('T')[0],
          reportedBy: item.objectData.reportedBy,
          severity: item.objectData.severity
        }));
        setEvents(eventsData);
      } catch (error) {
        console.error('Error loading events:', error);
      }
    };

    const loadPracticesFromDB = async () => {
      try {
        const result = await trickleListObjects('practice', 50, true);
        const practicesData = result.items.map(item => ({
          id: item.objectId,
          title: item.objectData.title,
          description: item.objectData.description,
          author: item.objectData.author,
          likes: item.objectData.likes,
          date: new Date(item.objectData.publishDate).toISOString().split('T')[0],
          category: item.objectData.category,
          tags: JSON.parse(item.objectData.tags || '[]')
        }));
        setPractices(practicesData);
      } catch (error) {
        console.error('Error loading practices:', error);
      }
    };

    const handleLogin = async (userData) => {
      try {
        // Save user to database
        const userObj = await saveUserToDB(userData);
        const fullUserData = { ...userData, objectId: userObj.objectId };
        setUser(fullUserData);
        saveUser(fullUserData);
        setCurrentPage('dashboard');
      } catch (error) {
        console.error('Error during login:', error);
        setUser(userData);
        saveUser(userData);
        setCurrentPage('dashboard');
      }
    };

    const handleLogout = () => {
      setUser(null);
      removeUser();
      setCurrentPage('home');
    };

    const addEvent = async (newEvent) => {
      try {
        const eventData = {
          type: newEvent.type,
          location: newEvent.location,
          latitude: newEvent.lat,
          longitude: newEvent.lng,
          description: newEvent.description,
          reportedBy: user.firstName + ' ' + user.lastName,
          reportDate: new Date().toISOString(),
          severity: newEvent.severity || 'Modéré'
        };
        
        const savedEvent = await trickleCreateObject('event', eventData);
        const event = {
          id: savedEvent.objectId,
          type: savedEvent.objectData.type,
          location: savedEvent.objectData.location,
          lat: savedEvent.objectData.latitude,
          lng: savedEvent.objectData.longitude,
          description: savedEvent.objectData.description,
          date: new Date(savedEvent.objectData.reportDate).toISOString().split('T')[0],
          reportedBy: savedEvent.objectData.reportedBy,
          severity: savedEvent.objectData.severity
        };
        setEvents(prev => [...prev, event]);
      } catch (error) {
        console.error('Error saving event:', error);
      }
    };

    const addPractice = async (newPractice) => {
      try {
        const practiceData = {
          title: newPractice.title,
          description: newPractice.description,
          author: user.firstName + ' ' + user.lastName,
          category: newPractice.category || 'Autre',
          likes: 0,
          publishDate: new Date().toISOString(),
          tags: JSON.stringify(newPractice.tags || [])
        };
        
        const savedPractice = await trickleCreateObject('practice', practiceData);
        const practice = {
          id: savedPractice.objectId,
          title: savedPractice.objectData.title,
          description: savedPractice.objectData.description,
          author: savedPractice.objectData.author,
          likes: savedPractice.objectData.likes,
          date: new Date(savedPractice.objectData.publishDate).toISOString().split('T')[0],
          category: savedPractice.objectData.category,
          tags: JSON.parse(savedPractice.objectData.tags || '[]')
        };
        setPractices(prev => [...prev, practice]);
      } catch (error) {
        console.error('Error saving practice:', error);
      }
    };

    return (
      <div className="min-h-screen bg-gray-50" data-name="app" data-file="app.js">
        <Header 
          user={user} 
          currentPage={currentPage} 
          setCurrentPage={setCurrentPage}
          onLogout={handleLogout}
          isAdmin={isAdmin}
        />
        
        <main className="container mx-auto px-4 py-8">
          {!user ? (
            <Login onLogin={handleLogin} />
          ) : (
            <>
              {currentPage === 'dashboard' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="card">
                    <h2 className="text-xl font-bold mb-4 text-green-700">Tableau de Bord</h2>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-green-100 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-green-600">{events.length}</div>
                        <div className="text-sm text-green-700">Événements signalés</div>
                      </div>
                      <div className="bg-blue-100 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-blue-600">{practices.length}</div>
                        <div className="text-sm text-blue-700">Bonnes pratiques</div>
                      </div>
                    </div>
                  </div>
                  <UserProfile user={user} />
                </div>
              )}
              
              {currentPage === 'report' && (
                <ReportEvent onAddEvent={addEvent} />
              )}
              
              {currentPage === 'map' && (
                <EventMap events={events} />
              )}
              
              {currentPage === 'practices' && (
                <BestPractices 
                  practices={practices} 
                  onAddPractice={addPractice}
                  user={user}
                />
              )}
              
              {currentPage === 'recommendations' && (
                <AIRecommendations 
                  user={user}
                  events={events}
                  practices={practices}
                />
              )}
              
              {currentPage === 'messages' && (
                <Messaging user={user} />
              )}
              
              {currentPage === 'admin' && isAdmin && (
                <AdminDashboard user={user} />
              )}
              
              {currentPage === 'analytics' && isAdmin && (
                <Analytics events={events} practices={practices} />
              )}
              
              {currentPage === 'notifications' && (
                <Notifications user={user} events={events} />
              )}
              
              {currentPage === 'reports' && isAdmin && (
                <Reports events={events} practices={practices} />
              )}
              
              {currentPage === 'community' && (
                <CommunityGroups user={user} />
              )}
            </>
          )}
        </main>
      </div>
    );
  } catch (error) {
    console.error('App component error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);