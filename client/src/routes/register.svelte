<script>
  let email;
  let password;
  // Can be:
  // 1. idle
  // 2. invalid
  // 3. submitting
  // 4. successful
  // 5. error
  let state = 'idle';

  async function handleSubmit() {
    state = 'submitting'

    try {
      fetch('/api/register', {
        method: 'POST',
	    'Content-Type': 'application/json',
        body: JSON.stringify({
          email,
          password
        })
      })
      state = 'successful'
    } catch (e) {
      state = 'idle'
      console.log('Submission failure...', e)
    }

  }
</script>

<style>
  label {
    display: block;
    margin-bottom: 1rem;
  }
  input {
    display: block;
  }
  button {
    padding: 0.5rem 1rem;
  }
</style>

<form on:submit|preventDefault={handleSubmit}>
  <label>
    Email:
    <input bind:value={email} type="email">
  </label>
  <label>
    Password:
    <input bind:value={password} type="password">
  </label>
  <button type="submit" disabled={state === 'submitting'}>Sign Up!</button>
</form>
