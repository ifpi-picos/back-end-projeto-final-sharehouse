export default function loadDb(request, _response, next) {

    // dummy db
    request.db = {
      users: {
        findByApiKey: async token => {
          switch {
            case (token == '1234') {
              return {role: 'owner', id: 1234};
            case (token == '5678') {
              return {role: 'employee', id: 5678};
            default:
              return null; // no user
          }
        }
      }
    };
    
    next();
  }