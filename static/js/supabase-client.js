// Simple Supabase bridge used by index.html
(function(){
    async function connectSupabase() {
        const url = document.getElementById('supabaseUrl').value.trim();
        const key = document.getElementById('supabaseAnonKey').value.trim();
        if (!url || !key) {
            alert('Please provide SUPABASE_URL and SUPABASE_ANON_KEY');
            return;
        }
        try {
            window.SUPABASE_URL = url;
            window.SUPABASE_ANON_KEY = key;
            if (typeof initializeSupabaseClient === 'function') {
                initializeSupabaseClient();
            } else {
                window.useSupabase = true;
                window.supabaseClient = supabase.createClient(url, key);
            }
            document.getElementById('btnFetchDb').style.display = 'inline-block';
            alert('Supabase connected (client created).');
        } catch (e) {
            console.error(e);
            alert('Failed to create Supabase client. See console.');
        }
    }

    async function fetchEntriesFromDb() {
        if (!window.useSupabase || !window.supabaseClient) {
            alert('Not connected to Supabase.');
            return;
        }
        const { data, error } = await window.supabaseClient
            .from('diary_entries')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(200);

        if (error) {
            console.error('fetchEntriesFromDb error', error);
            alert('Failed to fetch entries from DB. See console.');
            return;
        }

        // Map DB rows to front-end format
        const mapped = data.map(d => ({
            id: d.id,
            date: d.date || new Date(d.created_at).toLocaleString(),
            content: d.content,
            mood: d.mood,
            visibility: d.visibility,
            image: d.image,
            author: d.author_name ? { name: d.author_name, picture: d.author_picture, email: d.author_email } : null
        }));

        window.diaryEntries = mapped;
        localStorage.setItem('pixel_diary_entries', JSON.stringify(mapped));
        if (typeof renderEntries === 'function') renderEntries();
        alert('Synced ' + mapped.length + ' entries from Supabase');
    }

    window.connectSupabase = connectSupabase;
    window.fetchEntriesFromDb = fetchEntriesFromDb;
})();
