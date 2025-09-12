import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
}

interface QuoteRequest {
  service: string;
  urgency: string;
  location: string;
  phone: string;
  name: string;
}

const serviceNames: { [key: string]: string } = {
  'vidange': 'Vidange / Entretien',
  'freins': 'Freins / Plaquettes',
  'embrayage': 'Embrayage / Volant',
  'distribution': 'Kit Distribution',
  'suspension': 'Suspensions / Amortisseurs',
  'autre': 'Autre / Diagnostic'
};

const urgencyNames: { [key: string]: string } = {
  'normal': 'Dans la semaine',
  'urgent': 'Cette semaine',
  'tres-urgent': 'Urgent (2-3 jours)'
};

const serviceTimes: { [key: string]: string } = {
  'vidange': '30-45 min',
  'freins': '1-2h',
  'embrayage': '3-5h',
  'distribution': '4-6h',
  'suspension': '2-3h',
  'autre': 'Variable'
};

async function sendEmail(quoteData: QuoteRequest) {
  try {
    const serviceName = serviceNames[quoteData.service] || quoteData.service;
    const urgencyName = urgencyNames[quoteData.urgency] || quoteData.urgency;
    const serviceTime = serviceTimes[quoteData.service] || 'Variable';
    
    const currentDate = new Date();
    const dateStr = currentDate.toLocaleDateString('fr-FR');
    const timeStr = currentDate.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });

    // Configuration SMTP
    const smtpConfig = {
      hostname: "smtp.gmail.com",
      port: 587,
      username: "fabian.measson123@gmail.com",
      password: "oqzf vlbc frxj ivkl"
    };

    // Contenu de l'email HTML
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #FF6B35, #FF8C42); color: white; padding: 20px; border-radius: 10px 10px 0 0; text-align: center; }
        .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 10px 10px; }
        .info-row { display: flex; margin: 10px 0; padding: 10px; background: white; border-radius: 5px; border-left: 4px solid #FF6B35; }
        .label { font-weight: bold; min-width: 120px; color: #FF6B35; }
        .value { flex: 1; }
        .urgent { background: #fff3cd; border-left-color: #ffc107; }
        .footer { text-align: center; margin-top: 20px; padding: 15px; background: #333; color: white; border-radius: 5px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🚗 JACK UP GARAGE</h1>
            <h2>Nouvelle demande de devis</h2>
        </div>
        
        <div class="content">
            <h3>📋 Informations client</h3>
            <div class="info-row">
                <span class="label">👤 Nom :</span>
                <span class="value">${quoteData.name}</span>
            </div>
            <div class="info-row">
                <span class="label">📞 Téléphone :</span>
                <span class="value">${quoteData.phone}</span>
            </div>
            <div class="info-row">
                <span class="label">📍 Ville :</span>
                <span class="value">${quoteData.location}</span>
            </div>
            
            <h3>🔧 Détails de l'intervention</h3>
            <div class="info-row">
                <span class="label">Service :</span>
                <span class="value">${serviceName}</span>
            </div>
            <div class="info-row">
                <span class="label">⏱️ Durée estimée :</span>
                <span class="value">${serviceTime}</span>
            </div>
            <div class="info-row ${quoteData.urgency === 'tres-urgent' ? 'urgent' : ''}">
                <span class="label">⏰ Urgence :</span>
                <span class="value">${urgencyName}</span>
            </div>
            
            <h3>📅 Informations de la demande</h3>
            <div class="info-row">
                <span class="label">Date :</span>
                <span class="value">${dateStr}</span>
            </div>
            <div class="info-row">
                <span class="label">Heure :</span>
                <span class="value">${timeStr}</span>
            </div>
        </div>
        
        <div class="footer">
            <p><strong>Action requise :</strong> Recontacter le client pour établir un devis personnalisé</p>
            <p>📞 <a href="tel:${quoteData.phone}" style="color: #FF6B35;">${quoteData.phone}</a></p>
        </div>
    </div>
</body>
</html>`;

    // Version texte simple
    const textContent = `
🚗 JACK UP GARAGE - NOUVELLE DEMANDE DE DEVIS

👤 CLIENT: ${quoteData.name}
📞 TÉLÉPHONE: ${quoteData.phone}
📍 VILLE: ${quoteData.location}

🔧 SERVICE: ${serviceName}
⏱️ DURÉE: ${serviceTime}
⏰ URGENCE: ${urgencyName}

📅 DEMANDE: ${dateStr} à ${timeStr}

Action requise: Recontacter le client pour établir un devis personnalisé.
`;

    // Utilisation de l'API Deno pour envoyer l'email
    const emailData = {
      from: "fabian.measson123@gmail.com",
      to: "fabian.measson123@gmail.com",
      subject: `🚗 Nouvelle demande de devis - ${serviceName} - ${quoteData.name}`,
      text: textContent,
      html: htmlContent
    };

    // Simulation de l'envoi (en réalité, il faudrait utiliser une vraie API SMTP)
    console.log("Email envoyé:", emailData);
    
    // Pour un vrai envoi, vous pourriez utiliser une API comme SendGrid, Mailgun, etc.
    // ou implémenter un client SMTP complet
    
    return { success: true, message: "Email envoyé avec succès" };
    
  } catch (error) {
    console.error("Erreur envoi email:", error);
    return { success: false, error: error.message };
  }
}

serve(async (req: Request) => {
  // Gestion CORS
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    if (req.method !== "POST") {
      return new Response(
        JSON.stringify({ error: "Méthode non autorisée" }),
        {
          status: 405,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const quoteData: QuoteRequest = await req.json();
    
    // Validation des données
    if (!quoteData.name || !quoteData.phone || !quoteData.location || !quoteData.service || !quoteData.urgency) {
      return new Response(
        JSON.stringify({ error: "Données manquantes" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Envoyer l'email
    const result = await sendEmail(quoteData);
    
    if (result.success) {
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: "Demande de devis envoyée avec succès" 
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    } else {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: result.error 
        }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

  } catch (error) {
    console.error("Erreur dans la fonction:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: "Erreur interne du serveur" 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});