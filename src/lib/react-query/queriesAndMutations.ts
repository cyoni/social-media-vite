import React from 'react'

function queriesAndMutations() {
  
    const mutation = useMutation({
        mutationFn: (newTodo) => {
          return axios.post('/todos', newTodo)
        },
      })
}

export default queriesAndMutations