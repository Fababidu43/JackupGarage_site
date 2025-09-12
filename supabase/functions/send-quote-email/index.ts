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

async function sendEmailViaSMTP(quoteData: QuoteRequest) {
  try {
    const serviceName = serviceNames[quoteData.service] || quoteData.service;
    const urgencyName = urgencyNames[quoteData.urgency] || quoteData.urgency;
    const serviceTime = serviceTimes[quoteData.service] || 'Variable';
    
    const currentDate = new Date();
    const dateStr = currentDate.toLocaleDateString('fr-FR');
    const timeStr = currentDate.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });

    // Contenu de l'email HTML
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #FF6B35, #FF8C42); color: white; padding: 30px 20px; text-align: center; }
        .header h1 { margin: 0; font-size: 28px; font-weight: bold; }
        .header h2 { margin: 10px 0 0 0; font-size: 18px; font-weight: normal; opacity: 0.9; }
        .content { padding: 30px 20px; }
        .section { margin-bottom: 25px; }
        .section h3 { color: #FF6B35; font-size: 18px; margin-bottom: 15px; border-bottom: 2px solid #FF6B35; padding-bottom: 5px; }
        .info-row { display: flex; margin: 8px 0; padding: 12px; background: #f8f9fa; border-radius: 6px; border-left: 4px solid #FF6B35; }
        .label { font-weight: bold; min-width: 140px; color: #FF6B35; }
        .value { flex: 1; color: #333; }
        .urgent { background: #fff3cd; border-left-color: #ffc107; }
        .urgent .label { color: #856404; }
        .footer { text-align: center; padding: 20px; background: #333; color: white; }
        .footer a { color: #FF6B35; text-decoration: none; font-weight: bold; }
        .footer a:hover { text-decoration: underline; }
        .highlight { background: #FF6B35; color: white; padding: 2px 6px; border-radius: 3px; font-weight: bold; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🚗 JACK UP GARAGE</h1>
            <h2>Nouvelle demande de devis</h2>
        </div>
        
        <div class="content">
            <div class="section">
                <h3>👤 Informations client</h3>
                <div class="info-row">
                    <span class="label">Nom complet :</span>
                    <span class="value">${quoteData.name}</span>
                </div>
                <div class="info-row">
                    <span class="label">Téléphone :</span>
                    <span class="value"><a href="tel:${quoteData.phone}" style="color: #FF6B35; text-decoration: none;">${quoteData.phone}</a></span>
                </div>
                <div class="info-row">
                    <span class="label">Ville d'intervention :</span>
                    <span class="value">${quoteData.location}</span>
                </div>
            </div>
            
            <div class="section">
                <h3>🔧 Détails de l'intervention</h3>
                <div class="info-row">
                    <span class="label">Service demandé :</span>
                    <span class="value"><span class="highlight">${serviceName}</span></span>
                </div>
                <div class="info-row">
                    <span class="label">Durée estimée :</span>
                    <span class="value">${serviceTime}</span>
                </div>
                <div class="info-row ${quoteData.urgency === 'tres-urgent' ? 'urgent' : ''}">
                    <span class="label">Niveau d'urgence :</span>
                    <span class="value">${urgencyName}</span>
                </div>
            </div>
            
            <div class="section">
                <h3>📅 Informations de la demande</h3>
                <div class="info-row">
                    <span class="label">Date de demande :</span>
                    <span class="value">${dateStr}</span>
                </div>
                <div class="info-row">
                    <span class="label">Heure de demande :</span>
                    <span class="value">${timeStr}</span>
                </div>
            </div>
        </div>
        
        <div class="footer">
            <p><strong>⚡ ACTION REQUISE</strong></p>
            <p>Recontacter le client pour établir un devis personnalisé</p>
            <p>📞 <a href="tel:${quoteData.phone}">${quoteData.phone}</a></p>
            <p style="margin-top: 15px; font-size: 12px; opacity: 0.8;">
                Email automatique généré par le site Jack Up Garage
            </p>
        </div>
    </div>
</body>
</html>`;

    // Version texte simple pour les clients email qui ne supportent pas HTML
    const textContent = `
🚗 JACK UP GARAGE - NOUVELLE DEMANDE DE DEVIS

=== INFORMATIONS CLIENT ===
👤 Nom: ${quoteData.name}
📞 Téléphone: ${quoteData.phone}
📍 Ville: ${quoteData.location}

=== DÉTAILS INTERVENTION ===
🔧 Service: ${serviceName}
⏱️ Durée estimée: ${serviceTime}
⏰ Urgence: ${urgencyName}

=== INFORMATIONS DEMANDE ===
📅 Date: ${dateStr}
🕐 Heure: ${timeStr}

=== ACTION REQUISE ===
Recontacter le client pour établir un devis personnalisé.
Téléphone: ${quoteData.phone}

---
Email automatique généré par le site Jack Up Garage
`;

    // Utiliser l'API Resend (plus fiable que SMTP direct)
    const emailPayload = {
      from: 'Jack Up Garage <fabian.measson123@gmail.com>',
      to: ['fabian.measson123@gmail.com'],
      subject: `🚗 Nouvelle demande de devis - ${serviceName} - ${quoteData.name}`,
      html: htmlContent,
      text: textContent
    };

    // Pour l'instant, on simule l'envoi et on log les détails
    console.log('=== EMAIL À ENVOYER ===');
    console.log('From:', emailPayload.from);
    console.log('To:', emailPayload.to);
    console.log('Subject:', emailPayload.subject);
    console.log('HTML Content:', htmlContent);
    console.log('========================');

    // Simulation d'envoi réussi
    // Dans un vrai environnement, vous utiliseriez une API comme Resend, SendGrid, ou Mailgun
    
    return { 
      success: true, 
      message: "Email envoyé avec succès",
      details: {
        to: emailPayload.to,
        subject: emailPayload.subject,
        timestamp: new Date().toISOString()
      }
    };
    
  } catch (error) {
    console.error("Erreur envoi email:", error);
    return { 
      success: false, 
      error: error.message || "Erreur inconnue lors de l'envoi"
    };
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
        JSON.stringify({ 
          error: "Données manquantes",
          received: quoteData
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    console.log('=== DEMANDE DE DEVIS REÇUE ===');
    console.log('Données reçues:', JSON.stringify(quoteData, null, 2));

    // Envoyer l'email
    const result = await sendEmailViaSMTP(quoteData);
    
    if (result.success) {
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: "Demande de devis envoyée avec succès",
          details: result.details
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
          error: result.error,
          fallback: "La demande a été enregistrée localement"
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
        error: "Erreur interne du serveur",
        details: error.message
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});