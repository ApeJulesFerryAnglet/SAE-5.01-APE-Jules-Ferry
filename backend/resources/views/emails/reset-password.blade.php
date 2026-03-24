<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Réinitialisation du mot de passe</title>
    <style>
        body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 40px auto; background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); text-align: center; }
        .button { display: inline-block; padding: 12px 24px; background-color: #4CAF50; color: #ffffff; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 20px 0; }
        .footer { margin-top: 30px; font-size: 12px; color: #888888; }
    </style>
</head>
<body>
    <div class="container">
        <h2>Bonjour !</h2>
        <p>Vous recevez cet e-mail car nous avons reçu une demande de réinitialisation de mot de passe pour votre compte administrateur ou membre du bureau sur l'<strong>APE Jules Ferry</strong>.</p>
        
        <p>Cliquez sur le bouton ci-dessous pour choisir un nouveau mot de passe :</p>
        
        <a href="{{ $resetUrl }}" class="button" style="color: #ffffff;">Réinitialiser mon mot de passe</a>
        
        <p><em>Ce lien de réinitialisation expirera dans 15 minutes.</em></p>

        <div class="footer">
            <p>Si vous n'avez pas demandé de réinitialisation de mot de passe, vous pouvez ignorer cet e-mail.</p>
            <hr style="border: none; border-top: 1px solid #eeeeee; margin: 20px 0;">
            <p style="font-size: 11px;">
                Si vous rencontrez des problèmes avec le bouton, copiez-collez l'URL ci-dessous dans votre navigateur :<br>
                <a href="{{ $resetUrl }}" style="word-break: break-all; color: #888;">{{ $resetUrl }}</a>
            </p>
        </div>
    </div>
</body>
</html>
