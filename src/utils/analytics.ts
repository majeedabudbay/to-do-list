export const trackPageVisit = (pageName: string) => {
  console.log(`User visited: ${pageName}`);
};

export const trackUserAction = (action: string, id?: string) => {
  if (id) {
    console.log(`User performed: ${action} - Task ID: ${id}`);
  } else {
    console.log(`User performed: ${action}`);
  }
};


export const analytics = {
  pageVisit: {
    home: () => trackPageVisit('Home Page'),
    taskManagement: () => trackPageVisit('Task Management Page'),
  },
  actions: {
    addItem: () => trackUserAction('Add Item'),
    saveTask: (id?: string) => trackUserAction('Save Task', id),
    delete: (id?: string) => trackUserAction('Delete', id),
    complete: (id?: string) => trackUserAction('Complete', id),
    editTask: (id?: string) => trackUserAction('Edit Task', id),
  },
};