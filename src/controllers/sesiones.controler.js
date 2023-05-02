export async function postSesiones(req, res, next) {
    res.status(201).json(req.user)
}

export function deleteSesiones(req, res, next) {
    req.logout(err => {
        res.sendStatus(200)
    })
}

export function getCurrentSessionController(req, res, next) {
    // passport guarda la sesion directamente en ** req.user ** en lugar del campo session de la peticion !
    res.json(req.user)
}