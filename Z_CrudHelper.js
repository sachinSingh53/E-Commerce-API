app.get('/', async (req, res) => {
    try {
        const data = await db.query('SELECT * FROM example_table');
        res.status(200).json(data.rows);
    }
    catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message
        })
    }
})

app.get('/user/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await db.query('SELECT * FROM example_table WHERE id = $1', [id,]);
        res.status(200).json(data.rows[0]);
    }
    catch (err) {
        res.status(400).json({
            message: "fail"
        })
    }
})

app.post('/user', async (req, res) => {
    try {
        const { name, age, email } = req.body;

        const data = await db.query('INSERT INTO example_table (name,age,email) VALUES($1,$2,$3) returning *', [name, age, email]);

        res.status(200).json({
            staus: 'Success',
            data: data.rows
        })

    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        })
    }
})

app.put('/user/:id', async (req, res) => {
    try {
        const { name, age, email } = req.body;

        const data = await db.query('UPDATE example_table SET name = $1, age = $2, email = $3 where id = $4 returning *',
            [name, age, email, req.params.id]);

        res.status(200).json({
            staus: 'Success',
            data: data.rows
        })

    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        })
    }
})

app.delete('/user/:id', async (req, res) => {
    try {
        // const {name,age,email} = req.body;

        await db.query('DELETE FROM example_table WHERE id = $1', [req.params.id]);

        res.status(200).json({
            staus: 'Success',
        })

    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        })
    }
})

app.post('/user/:id/review', async (req, res) => {
    try {
        const { reviewer_name, rating, comments } = req.body;
        const id = req.params.id;
        const review = await db.query('INSERT INTO review (reviewer_name,rating,comments,example_table_id) VALUES($1,$2,$3,$4) returning *', 
                                        [reviewer_name, rating, comments, id]);
        res.status(200).json({
            status:'success',
            data:review.rows
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        })
    }
})