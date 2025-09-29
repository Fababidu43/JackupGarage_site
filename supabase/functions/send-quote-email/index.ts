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
  formType: 'quote';
}

interface ContactRequest {
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  email: string;
  registration?: string;
  subject: string;
  message: string;
  hasHardFlatGround: boolean;
  formType: 'contact';
}

type FormRequest = QuoteRequest | ContactRequest;

const serviceNames: { [key: string]: string } = {
  'vidange': 'Vidange / Entretien',
  'freins': 'Freins / Plaquettes',
  'embrayage': 'Embrayage / Volant',
  'distribution': 'Kit Distribution',
  'suspension': 'Suspensions / Amortisseurs',
  'autre': 'Autre'
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

const subjectNames: { [key: string]: string } = {
  'entretien': 'Entretien / Vidange',
  'embrayage': 'Embrayage / Volant moteur',
  'distribution': 'Kit distribution',
  'suspension': 'Suspensions / Amortisseurs',
  'autre': 'Autre'
};

async function sendEmailViaMailerSend(formData: FormRequest) {
  try {
    const currentDate = new Date();
    const dateStr = currentDate.toLocaleDateString('fr-FR');
    const timeStr = currentDate.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });

    let htmlContent: string;
    let textContent: string;
    let emailSubject: string;

    if (formData.formType === 'quote') {
      // Email pour devis express
      const serviceName = serviceNames[formData.service] || formData.service;
      const urgencyName = urgencyNames[formData.urgency] || formData.urgency;
      const serviceTime = serviceTimes[formData.service] || 'Variable';
      
      emailSubject = `🚗 Nouvelle demande de devis - ${serviceName} - ${formData.name}`;
      
      htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nouvelle demande de devis - JACK Up Auto</title>
    <style>
        body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            line-height: 1.6; 
            color: #333; 
            margin: 0; 
            padding: 0; 
            background-color: #f5f5f5;
        }
        .container { 
            max-width: 600px; 
            margin: 20px auto; 
            background: white; 
            border-radius: 12px; 
            overflow: hidden; 
            box-shadow: 0 8px 32px rgba(0,0,0,0.1);
            border: 1px solid #e0e0e0;
        }
        .header { 
            background: linear-gradient(135deg, #FF6B35, #FF8C42); 
            color: white; 
            padding: 30px 20px; 
            text-align: center;
            position: relative;
        }
        .header::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, #FF6B35, #FFB347, #FF6B35);
        }
        .header h1 { 
            margin: 0; 
            font-size: 28px; 
            font-weight: bold; 
            text-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        .header h2 { 
            margin: 10px 0 0 0; 
            font-size: 18px; 
            font-weight: normal; 
            opacity: 0.95;
        }
        .content { 
            padding: 30px 25px; 
        }
        .section { 
            margin-bottom: 25px; 
            background: #fafafa;
            border-radius: 8px;
            padding: 20px;
            border-left: 4px solid #FF6B35;
        }
        .section h3 { 
            color: #FF6B35; 
            font-size: 18px; 
            margin: 0 0 15px 0; 
            font-weight: bold;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .info-row { 
            display: flex; 
            margin: 12px 0; 
            padding: 12px 15px; 
            background: white; 
            border-radius: 6px; 
            border: 1px solid #e8e8e8;
            transition: all 0.2s ease;
        }
        .info-row:hover {
            border-color: #FF6B35;
            box-shadow: 0 2px 8px rgba(255, 107, 53, 0.1);
        }
        .label { 
            font-weight: bold; 
            min-width: 140px; 
            color: #FF6B35; 
            font-size: 14px;
        }
        .value { 
            flex: 1; 
            color: #333; 
            font-size: 14px;
        }
        .urgent { 
            background: #fff8e1; 
            border-left-color: #ffc107; 
        }
        .urgent .label { 
            color: #f57c00; 
        }
        .footer { 
            text-align: center; 
            padding: 25px 20px; 
            background: #2c2c2c; 
            color: white; 
        }
        .footer h4 {
            color: #FF6B35;
            margin: 0 0 10px 0;
            font-size: 18px;
        }
        .footer a { 
            color: #FF6B35; 
            text-decoration: none; 
            font-weight: bold; 
            font-size: 18px;
        }
        .footer a:hover { 
            text-decoration: underline; 
        }
        .highlight { 
            background: linear-gradient(135deg, #FF6B35, #FF8C42); 
            color: white; 
            padding: 4px 8px; 
            border-radius: 4px; 
            font-weight: bold; 
            display: inline-block;
        }
        .priority-high {
            background: #ffebee;
            border-left-color: #f44336;
        }
        .priority-high .highlight {
            background: linear-gradient(135deg, #f44336, #ff5722);
        }
        .timestamp {
            background: #f0f8ff;
            border: 1px solid #e3f2fd;
            border-radius: 6px;
            padding: 15px;
            margin-top: 20px;
            text-align: center;
        }
        .call-to-action {
            background: linear-gradient(135deg, #FF6B35, #FF8C42);
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            text-align: center;
            margin: 20px 0;
        }
        .call-to-action a {
            color: white;
            text-decoration: none;
            font-weight: bold;
            font-size: 16px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🚗 JACK UP AUTO</h1>
            <h2>Nouvelle demande de devis</h2>
        </div>
        
        <div class="content">
            <div class="section">
                <h3>👤 Informations client</h3>
                <div class="info-row">
                    <span class="label">Nom complet :</span>
                    <span class="value"><strong>${formData.name}</strong></span>
                </div>
                <div class="info-row">
                    <span class="label">Téléphone :</span>
                    <span class="value"><a href="tel:${formData.phone}" style="color: #FF6B35; text-decoration: none; font-weight: bold;">${formData.phone}</a></span>
                </div>
                <div class="info-row">
                    <span class="label">Ville d'intervention :</span>
                    <span class="value"><strong>${formData.location}</strong></span>
                </div>
            </div>
            
            <div class="section ${formData.urgency === 'tres-urgent' ? 'priority-high' : ''}">
                <h3>🔧 Détails de l'intervention</h3>
                <div class="info-row">
                    <span class="label">Service demandé :</span>
                    <span class="value"><span class="highlight">${serviceName}</span></span>
                </div>
                <div class="info-row">
                    <span class="label">Durée estimée :</span>
                    <span class="value"><strong>${serviceTime}</strong></span>
                </div>
                <div class="info-row">
                    <span class="label">Niveau d'urgence :</span>
                    <span class="value"><strong style="color: ${formData.urgency === 'tres-urgent' ? '#f44336' : formData.urgency === 'urgent' ? '#ff9800' : '#4caf50'}">${urgencyName}</strong></span>
                </div>
            </div>
            
            <div class="timestamp">
                <strong>📅 Demande reçue le ${dateStr} à ${timeStr}</strong>
            </div>
            
            <div class="call-to-action">
                <p style="margin: 0 0 10px 0;"><strong>⚡ ACTION REQUISE</strong></p>
                <p style="margin: 0;">Recontacter le client pour établir un devis personnalisé</p>
            </div>
        </div>
        
        <div class="footer">
            <h4>📞 Rappeler le client</h4>
            <p><a href="tel:${formData.phone}">${formData.phone}</a></p>
            <p style="margin-top: 20px; font-size: 12px; opacity: 0.8; color: #ccc;">
                Email automatique généré par le site JACK Up Auto<br>
                ${new Date().toISOString()}
            </p>
        </div>
    </div>
</body>
</html>`;


    // Version texte simple pour les clients email qui ne supportent pas HTML
      textContent = `
🚗 JACK UP AUTO - NOUVELLE DEMANDE DE DEVIS

=== INFORMATIONS CLIENT ===
👤 Nom: ${formData.name}
📞 Téléphone: ${formData.phone}
📍 Ville: ${formData.location}

=== DÉTAILS INTERVENTION ===
🔧 Service: ${serviceName}
⏱️ Durée estimée: ${serviceTime}
⏰ Urgence: ${urgencyName}

=== INFORMATIONS DEMANDE ===
📅 Date: ${dateStr}
🕐 Heure: ${timeStr}

=== ACTION REQUISE ===
Recontacter le client pour établir un devis personnalisé.
Téléphone: ${formData.phone}

---
Email automatique généré par le site JACK Up Auto
${new Date().toISOString()}
`;
    } else {
      // Email pour formulaire de contact
      const subjectName = subjectNames[formData.subject] || formData.subject;
      
      emailSubject = `📞 Nouveau message de contact - ${subjectName} - ${formData.firstName} ${formData.lastName}`;
      
      htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nouveau message de contact - JACK Up Auto</title>
    <style>
        body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            line-height: 1.6; 
            color: #333; 
            margin: 0; 
            padding: 0; 
            background-color: #f5f5f5;
        }
        .container { 
            max-width: 600px; 
            margin: 20px auto; 
            background: white; 
            border-radius: 12px; 
            overflow: hidden; 
            box-shadow: 0 8px 32px rgba(0,0,0,0.1);
            border: 1px solid #e0e0e0;
        }
        .header { 
            background: linear-gradient(135deg, #FF6B35, #FF8C42); 
            color: white; 
            padding: 30px 20px; 
            text-align: center;
            position: relative;
        }
        .header::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, #FF6B35, #FFB347, #FF6B35);
        }
        .header h1 { 
            margin: 0; 
            font-size: 28px; 
            font-weight: bold; 
            text-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        .header h2 { 
            margin: 10px 0 0 0; 
            font-size: 18px; 
            font-weight: normal; 
            opacity: 0.95;
        }
        .content { 
            padding: 30px 25px; 
        }
        .section { 
            margin-bottom: 25px; 
            background: #fafafa;
            border-radius: 8px;
            padding: 20px;
            border-left: 4px solid #FF6B35;
        }
        .section h3 { 
            color: #FF6B35; 
            font-size: 18px; 
            margin: 0 0 15px 0; 
            font-weight: bold;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .info-row { 
            display: flex; 
            margin: 12px 0; 
            padding: 12px 15px; 
            background: white; 
            border-radius: 6px; 
            border: 1px solid #e8e8e8;
            transition: all 0.2s ease;
        }
        .info-row:hover {
            border-color: #FF6B35;
            box-shadow: 0 2px 8px rgba(255, 107, 53, 0.1);
        }
        .label { 
            font-weight: bold; 
            min-width: 140px; 
            color: #FF6B35; 
            font-size: 14px;
        }
        .value { 
            flex: 1; 
            color: #333; 
            font-size: 14px;
        }
        .message-content {
            background: white;
            padding: 20px;
            border-radius: 8px;
            border: 1px solid #e8e8e8;
            font-style: italic;
            line-height: 1.6;
        }
        .footer { 
            text-align: center; 
            padding: 25px 20px; 
            background: #2c2c2c; 
            color: white; 
        }
        .footer h4 {
            color: #FF6B35;
            margin: 0 0 10px 0;
            font-size: 18px;
        }
        .footer a { 
            color: #FF6B35; 
            text-decoration: none; 
            font-weight: bold; 
            font-size: 18px;
        }
        .footer a:hover { 
            text-decoration: underline; 
        }
        .timestamp {
            background: #f0f8ff;
            border: 1px solid #e3f2fd;
            border-radius: 6px;
            padding: 15px;
            margin-top: 20px;
            text-align: center;
        }
        .call-to-action {
            background: linear-gradient(135deg, #FF6B35, #FF8C42);
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            text-align: center;
            margin: 20px 0;
        }
        .call-to-action a {
            color: white;
            text-decoration: none;
            font-weight: bold;
            font-size: 16px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🚗 JACK UP AUTO</h1>
            <h2>Nouveau message de contact</h2>
        </div>
        
        <div class="content">
            <div class="section">
                <h3>👤 Informations client</h3>
                <div class="info-row">
                    <span class="label">Nom complet :</span>
                    <span class="value"><strong>${formData.firstName} ${formData.lastName}</strong></span>
                </div>
                <div class="info-row">
                    <span class="label">Téléphone :</span>
                    <span class="value"><a href="tel:${formData.phone}" style="color: #FF6B35; text-decoration: none; font-weight: bold;">${formData.phone}</a></span>
                </div>
                <div class="info-row">
                    <span class="label">Email :</span>
                    <span class="value"><a href="mailto:${formData.email}" style="color: #FF6B35; text-decoration: none; font-weight: bold;">${formData.email}</a></span>
                </div>
                <div class="info-row">
                    <span class="label">Adresse d'intervention :</span>
                    <span class="value"><strong>${formData.address}</strong></span>
                </div>
                ${formData.registration ? `
                <div class="info-row">
                    <span class="label">Immatriculation :</span>
                    <span class="value"><strong>${formData.registration}</strong></span>
                </div>
                ` : ''}
            </div>
            
            <div class="section">
                <h3>🔧 Détails de la demande</h3>
                <div class="info-row">
                    <span class="label">Objet :</span>
                    <span class="value"><strong>${subjectName}</strong></span>
                </div>
                <div class="info-row">
                    <span class="label">Sol dur disponible :</span>
                    <span class="value"><strong style="color: ${formData.hasHardFlatGround ? '#4caf50' : '#f44336'}">${formData.hasHardFlatGround ? 'Oui ✓' : 'Non ✗'}</strong></span>
                </div>
            </div>
            
            <div class="section">
                <h3>💬 Message du client</h3>
                <div class="message-content">
                    "${formData.message}"
                </div>
            </div>
            
            <div class="timestamp">
                <strong>📅 Message reçu le ${dateStr} à ${timeStr}</strong>
            </div>
            
            <div class="call-to-action">
                <p style="margin: 0 0 10px 0;"><strong>⚡ ACTION REQUISE</strong></p>
                <p style="margin: 0;">Recontacter le client pour répondre à sa demande</p>
            </div>
        </div>
        
        <div class="footer">
            <h4>📞 Contacter le client</h4>
            <p>
                <a href="tel:${formData.phone}">${formData.phone}</a> • 
                <a href="mailto:${formData.email}">${formData.email}</a>
            </p>
            <p style="margin-top: 20px; font-size: 12px; opacity: 0.8; color: #ccc;">
                Email automatique généré par le site JACK Up Auto<br>
                ${new Date().toISOString()}
            </p>
        </div>
    </div>
</body>
</html>`;

      textContent = `
🚗 JACK UP AUTO - NOUVEAU MESSAGE DE CONTACT

=== INFORMATIONS CLIENT ===
👤 Nom: ${formData.firstName} ${formData.lastName}
📞 Téléphone: ${formData.phone}
📧 Email: ${formData.email}
📍 Adresse: ${formData.address}
${formData.registration ? `🚗 Immatriculation: ${formData.registration}` : ''}

=== DÉTAILS DEMANDE ===
🔧 Objet: ${subjectName}
🏠 Sol dur disponible: ${formData.hasHardFlatGround ? 'Oui' : 'Non'}

=== MESSAGE ===
"${formData.message}"

=== INFORMATIONS DEMANDE ===
📅 Date: ${dateStr}
🕐 Heure: ${timeStr}

=== ACTION REQUISE ===
Recontacter le client pour répondre à sa demande.
Téléphone: ${formData.phone}
Email: ${formData.email}

---
Email automatique généré par le site JACK Up Auto
${new Date().toISOString()}
`;
    }

    console.log('=== ENVOI EMAIL VIA API MAILERSEND ===');

    // Payload pour l'API MailerSend
    const emailPayload = {
      from: {
        email: "MS_EOl33K@test-q3enl6kvz2r42vwr.mlsender.net",
        name: "JACK Up Auto"
      },
      to: [
        {
          email: "jackup-auto@outlook.fr",
          name: "JACK Up Auto"
        }
      ],
      subject: `🚗 Nouvelle demande de devis - ${serviceName} - ${quoteData.name}`,
      subject: emailSubject,
      html: htmlContent,
      text: textContent
    };

    console.log('Envoi vers MailerSend API...');

    // Récupérer le token depuis les variables d'environnement
    const mailerSendToken = Deno.env.get('MAILERSEND_API_TOKEN');
    
    if (!mailerSendToken) {
      throw new Error('Token MailerSend manquant dans les variables d\'environnement');
    }

    // Appel à l'API MailerSend
    const response = await fetch('https://api.mailersend.com/v1/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${mailerSendToken}`,
        'X-Requested-With': 'XMLHttpRequest'
      },
      body: JSON.stringify(emailPayload)
    });

    console.log('Réponse MailerSend status:', response.status);
    
    if (response.ok) {
      let result;
      const contentType = response.headers.get('content-type');
      
      try {
        if (contentType && contentType.includes('application/json')) {
          result = await response.json();
        } else {
          const textResponse = await response.text();
          result = { message: textResponse || 'Email sent successfully' };
        }
      } catch (jsonError) {
        console.log('Erreur parsing JSON, lecture en texte:', jsonError);
        const textResponse = await response.text();
        result = { message: textResponse || 'Email sent successfully' };
      }
      
      console.log('✅ Email envoyé avec succès via MailerSend');
      console.log('Détails:', result);
      
      return { 
        success: true, 
        message: "Email envoyé avec succès via MailerSend",
        details: {
          to: 'jackup-auto@outlook.fr',
          subject: emailSubject,
          timestamp: new Date().toISOString(),
          formType: formData.formType,
          client: formData.formType === 'quote' ? formData.name : `${formData.firstName} ${formData.lastName}`,
          phone: formData.phone,
          mailersend_response: result
        }
      };
    } else {
      let errorText;
      try {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const errorJson = await response.json();
          errorText = JSON.stringify(errorJson);
        } else {
          errorText = await response.text();
        }
      } catch (error) {
        errorText = await response.text();
      }
      
      console.error('❌ Erreur MailerSend:', response.status, errorText);
      
      return { 
        success: false, 
        error: `Erreur MailerSend: ${response.status} - ${errorText}`
      };
    }
    
  } catch (error) {
    console.error("Erreur envoi email MailerSend:", error);
    return { 
      success: false, 
      error: error.message || "Erreur inconnue lors de l'envoi MailerSend"
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

    const formData: FormRequest = await req.json();
    
    // Validation des données
    let isValid = false;
    
    if (formData.formType === 'quote') {
      isValid = !!(formData.name && formData.phone && formData.location && formData.service && formData.urgency);
    } else if (formData.formType === 'contact') {
      isValid = !!(formData.firstName && formData.lastName && formData.phone && formData.email && formData.address && formData.subject && formData.message);
    }
    
    if (!isValid) {
      return new Response(
        JSON.stringify({ 
          error: "Données manquantes",
          received: formData
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    console.log(`=== ${formData.formType === 'quote' ? 'DEMANDE DE DEVIS' : 'MESSAGE DE CONTACT'} REÇU ===`);
    console.log('Données reçues:', JSON.stringify(formData, null, 2));

    // Envoyer l'email via MailerSend
    const result = await sendEmailViaMailerSend(formData);
    
    if (result.success) {
      console.log('✅ Email traité avec succès');
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: formData.formType === 'quote' ? "Demande de devis traitée avec succès" : "Message de contact traité avec succès",
          details: result.details
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    } else {
      console.error('❌ Erreur traitement email:', result.error);
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