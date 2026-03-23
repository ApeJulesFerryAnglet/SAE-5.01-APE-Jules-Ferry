<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Réinitialisation du mot de passe</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            color: #333;
            line-height: 1.6;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .btn {
            display: inline-block;
            padding: 10px 20px;
            background-color: #007bff;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 15px;
            margin-bottom: 15px;
        }
        .footer {
            margin-top: 20px;
            font-size: 0.9em;
            color: #777;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>Bonjour,</h2>
        <p>Vous recevez cet e-mail car nous avons reçu une demande de réinitialisation de mot de passe pour votre compte administrateur ou membre du bureau sur l'APE Jules Ferry.</p>
        
        <p>Cliquez sur le bouton ci-dessous pour choisir un nouveau mot de passe :</p>
        
        <a href="{{ $resetUrl }}" class="btn">Réinitialiser le mot de passe</a>
        
        <p>Ce lien de réinitialisation expirera dans 60 minutes.</p>

        <p>Si vous n'avez pas demandé de réinitialisation de mot de passe, aucune autre action n'est requise.</p>
        
        <p>Cordialement,<br>L'équipe APE Jules Ferry</p>

        <hr>
        <p class="footer">
            Si vous rencontrez des problèmes avec le bouton "Réinitialiser le mot de passe", copiez et collez l'URL ci-dessous dans votre navigateur web :<br>
            <a href="{{ $resetUrl }}">{{ $resetUrl }}</a>
        </p>
    </div>
</body>
</html>
